"""
Modified data preprocessing functions for Indian data.
"""
import numpy as np
import pandas as pd
import pickle
from pathlib import Path
from sklearn.preprocessing import MinMaxScaler
import tensorflow as tf
from skimage import io
from skimage.transform import resize

from DataPreprocess import *
from ForFeatureEngineering import *
from ForMobileNet import *
from config.india_config import *

def setup_india(setting, city, normalize_vit=False):
    """Setup data for training with Indian specifics."""
    path = Path(f"{BASE_DATA_PATH}/sorted/{city}")
    df = pd.read_csv(path / "label.csv")
    
    # Load features and images
    feature_ls, img_ls, case_ls = readFeaturesAndImages(df, path)
    
    # Get thresholds for cloud and shadow detection
    threshold_dic = getThresholds(img_ls)
    
    # Process features
    all_feature_ls = readFeatureName(df, path)
    selected_feature_ls = SELECTED_FEATURES
    
    # Create time series data
    lstm_week = setting["lstm_weeks"]
    
    # Prepare data splits - adjusted for Indian seasonal patterns
    # Use more data for training due to complex monsoon patterns
    train_size = int(0.7 * len(feature_ls))  # 70% for training
    val_size = int(0.15 * len(feature_ls))   # 15% for validation
    
    # Split data
    train_feature = feature_ls[:train_size]
    val_feature = feature_ls[train_size:train_size+val_size]
    test_feature = feature_ls[train_size+val_size:]
    
    train_img = img_ls[:train_size]
    val_img = img_ls[train_size:train_size+val_size]
    test_img = img_ls[train_size+val_size:]
    
    train_case = case_ls[:train_size]
    val_case = case_ls[train_size:train_size+val_size]
    test_case = case_ls[train_size+val_size:]
    
    # Prepare labels
    train_label = df["Cases"].values[:train_size]
    val_label = df["Cases"].values[train_size:train_size+val_size]
    test_label = df["Cases"].values[train_size+val_size:]
    
    # Scale labels
    scaler = MinMaxScaler()
    train_label_scaled = scaler.fit_transform(train_label.reshape(-1, 1)).flatten()
    val_label_scaled = scaler.transform(val_label.reshape(-1, 1)).flatten()
    test_label_scaled = scaler.transform(test_label.reshape(-1, 1)).flatten()
    
    # Create time series
    x_train_feature = prepareTimeSeries(train_feature, lstm_week)
    x_val_feature = prepareTimeSeries(val_feature, lstm_week)
    x_test_feature = prepareTimeSeries(test_feature, lstm_week)
    
    x_train_img = prepareTimeSeries(train_img, lstm_week)
    x_val_img = prepareTimeSeries(val_img, lstm_week)
    x_test_img = prepareTimeSeries(test_img, lstm_week)
    
    x_train_case = prepareTimeSeries(train_case, lstm_week)
    x_val_case = prepareTimeSeries(val_case, lstm_week)
    x_test_case = prepareTimeSeries(test_case, lstm_week)
    
    y_train = train_label_scaled[lstm_week:]
    y_val = val_label_scaled[lstm_week:]
    y_test = test_label_scaled[lstm_week:]
    
    origin_y_train = train_label[lstm_week:]
    origin_y_val = val_label[lstm_week:]
    origin_y_test = test_label[lstm_week:]
    
    # Process images for CNN and ViT
    resized_img_shape = setting["resized_img_shape"]
    
    # Process for MobileNet
    x_train_cnn = processCnnImages(x_train_img, resized_img_shape)
    x_val_cnn = processCnnImages(x_val_img, resized_img_shape)
    x_test_cnn = processCnnImages(x_test_img, resized_img_shape)
    
    # Process for ViT
    x_train_vit = processVitImages(x_train_img, resized_img_shape, normalize=normalize_vit)
    x_val_vit = processVitImages(x_val_img, resized_img_shape, normalize=normalize_vit)
    x_test_vit = processVitImages(x_test_img, resized_img_shape, normalize=normalize_vit)
    
    # Organize data
    data = {
        "train": {
            "x_feng": x_train_feature,
            "x_cnn": x_train_cnn,
            "x_vit": x_train_vit,
            "case": x_train_case
        },
        "val": {
            "x_feng": x_val_feature,
            "x_cnn": x_val_cnn,
            "x_vit": x_val_vit,
            "case": x_val_case
        },
        "test": {
            "x_feng": x_test_feature,
            "x_cnn": x_test_cnn,
            "x_vit": x_test_vit,
            "case": x_test_case
        }
    }
    
    labels = {
        "train": y_train,
        "val": y_val,
        "test": y_test,
        "origin_train": origin_y_train,
        "origin_val": origin_y_val,
        "origin_test": origin_y_test
    }
    
    return setting, data, labels, scaler

def processCnnImages(img_series, target_size):
    """Process images for CNN with Indian-specific band selection."""
    # For Indian data, we might want to adjust the band selection
    # based on the satellite imagery available (Landsat vs Sentinel)
    # Default is RGB bands (0,1,2)
    selected_bands = [0, 1, 2]  # RGB bands
    
    processed_imgs = []
    for week_imgs in img_series:
        week_processed = []
        for img in week_imgs:
            # Resize and select bands
            resized = resizeToRgbImg(img, selected_bands, target_size)
            week_processed.append(resized)
        processed_imgs.append(week_processed)
    
    return np.array(processed_imgs)

def processVitImages(img_series, target_size, normalize=False):
    """Process images for Vision Transformer with Indian-specific adjustments."""
    processed_imgs = []
    for week_imgs in img_series:
        week_processed = []
        for img in week_imgs:
            # For ViT, we need to ensure the image is properly sized
            # and has the right number of channels
            if img.shape[-1] >= 3:
                # Use first 3 bands (typically RGB)
                selected_img = img[:, :, :3]
            else:
                # If fewer than 3 bands, duplicate the first band
                selected_img = np.stack([img[:, :, 0]] * 3, axis=-1)
            
            # Resize to target size
            resized = resize(selected_img, target_size, preserve_range=True, anti_aliasing=True)
            
            # Normalize if requested
            if normalize:
                resized = (resized - resized.min()) / (resized.max() - resized.min() + 1e-8)
            
            week_processed.append(resized)
        processed_imgs.append(week_processed)
    
    return np.array(processed_imgs)

def readFeaturesAndImages(df, path):
    """Read features and images with adjustments for Indian data format."""
    feature_ls = []
    img_ls = []
    case_ls = []
    
    for i, row in df.iterrows():
        epiweek = row["epiweek"]
        
        # Load feature file
        feature_file = path / "feature" / f"{epiweek}.pickle"
        if not feature_file.exists():
            print(f"Warning: Feature file not found for week {epiweek}")
            continue
            
        with open(feature_file, "rb") as handle:
            feature_dic = pickle.load(handle)
            
        # Load image file
        img_file = path / "image" / f"{epiweek}.tiff"
        if not img_file.exists():
            print(f"Warning: Image file not found for week {epiweek}")
            continue
            
        img = io.imread(img_file)
        
        # Get case data
        case = np.array([row["Cases"]]).reshape(1, 1)
        
        # Extract features from dictionary
        all_feature_ls = []
        for tile_num in range(len(feature_dic)):
            feature_values = list(feature_dic[tile_num].values())
            all_feature_ls.append(feature_values)
        
        feature_ls.append(np.array(all_feature_ls))
        img_ls.append(img)
        case_ls.append(case)
    
    return np.array(feature_ls), np.array(img_ls), np.array(case_ls)

def getThresholds(img_ls):
    """Calculate cloud and shadow thresholds for Indian imagery."""
    # For Indian data, we might need to adjust thresholds
    # based on monsoon patterns and different satellite characteristics
    threshold_dic = {}
    
    # Calculate statistics from the first few images
    sample_imgs = img_ls[:min(10, len(img_ls))]
    
    # Calculate mean and std for each band
    for band_idx in range(sample_imgs[0].shape[-1]):
        band_values = []
        for img in sample_imgs:
            band_values.extend(img[:, :, band_idx].flatten())
        
        band_values = np.array(band_values)
        mean = np.mean(band_values)
        std = np.std(band_values)
        
        # Set thresholds based on statistics
        # Cloud threshold: mean + 2*std
        # Shadow threshold: mean - 2*std
        threshold_dic[f"band_{band_idx}_cloud"] = mean + 2 * std
        threshold_dic[f"band_{band_idx}_shadow"] = max(0, mean - 2 * std)
    
    return threshold_dic

