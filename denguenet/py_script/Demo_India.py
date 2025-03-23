"""
Demo script for visualizing DengueNet predictions on Indian data.
"""
import os
from pathlib import Path
import pandas as pd
import sys
import argparse
import tensorflow as tf
from IPython.display import Image, display
import matplotlib.pyplot as plt
from scipy.stats.stats import pearsonr
import numpy as np

# Add parent directory to path for imports
root_dir = Path(__file__).parents[1]
sys.path.insert(0, str(root_dir / "util"))
sys.path.insert(0, str(root_dir / "model"))
sys.path.insert(0, str(root_dir / "config"))

from DengueNet import *
from DataPreprocess import *
from DataPreprocess_India import setup_india
from ModelUtil import *
from ForFeatureEngineering import getFeatureList, getThresholdPairList
from CalculateMetric import evalModel, plotModelStructure, plotHeatmap
from india_config import *

def setParser():
    parser = argparse.ArgumentParser(description='Demo DengueNet with Indian data')
    parser.add_argument('--project_folder', type=str, default='/path/to/project', help='Project folder path')
    parser.add_argument('--gpu_index', type=str, default='0', help='GPU index to use')
    parser.add_argument('--gpu_size', type=int, default=10, help='GPU memory to use (GB)')
    parser.add_argument('--limit_gpu', action='store_true', help='Limit GPU memory usage')
    parser.add_argument('--city', type=int, default=None, help='City index to process (0-4)')
    parser.add_argument('--reverse_city_sequence', action='store_true', help='Reverse city processing order')
    parser.add_argument('--country', type=str, default='india', help='Country to use (colombia or india)')
    return parser.parse_args()

def plotPredictions(city_ls):
    root_folder = Path(f"{RESULTS_PATH}/demo/")
    df = pd.read_csv(root_folder / "predictions.csv")
    print(df.head(4))
    
    for city in city_ls:
        path = Path(f"{BASE_DATA_PATH}/sorted/{city}")
        ground_true = pd.read_csv(path / "label.csv")["Cases"][5:]
        print("Ground Truth:", len(ground_true))
        selected_df = df.loc[df["City"] == int(city)].copy()

        # Plot different model combinations
        model_ls = ["FengVit"]
        swap_ls = [True, False]
        name = getCodeToNameMap()[int(city)]
        plotSelected(
            model_ls, swap_ls, selected_df, ground_true, root_folder / city, name
        )

        model_ls = ["VitFengCase", "FengVit", "Case"]
        swap_ls = [True]
        plotSelected(
            model_ls, swap_ls, selected_df, ground_true, root_folder / city, name
        )

        model_ls = ["Feng", "Vit", "FengVit"]
        swap_ls = [True]
        plotSelected(
            model_ls, swap_ls, selected_df, ground_true, root_folder / city, name
        )

def plotSelected(model_ls, swap_ls, df, ground_true, folder, city_name):
    """Plot selected model predictions against ground truth."""
    color_ls = ["blue", "orange", "cyan", "green", "olive", "purple", "brown"]
    name = "_".join(model_ls)
    plt.figure(figsize=(10, 6))
    length = range(len(ground_true))
    plt.rcParams.update({"font.size": 14})
    
    # Plot ground truth
    plt.plot(length, ground_true, label="Ground Truth", color="tab:red", linewidth=2)
    
    # Add vertical lines for train/val/test splits
    train_end = int(0.7 * len(ground_true))
    val_end = train_end + int(0.15 * len(ground_true))
    
    plt.axvline(x=train_end, linestyle='--', color='tab:gray')
    plt.axvline(x=val_end, linestyle='--', color='tab:gray')
    
    # Add text labels for the splits
    plt.text(train_end/2, max(ground_true)*0.9, "Training", ha='center')
    plt.text(train_end + (val_end-train_end)/2, max(ground_true)*0.9, "Validation", ha='center')
    plt.text(val_end + (len(ground_true)-val_end)/2, max(ground_true)*0.9, "Testing", ha='center')

    # Plot model predictions
    counter = 0
    for i, row in df.iterrows():
        label = str(row["Model"])
        swap = bool(row["Swap"])

        pred = str(row["Prediction"]).replace(",", "").split()
        pred = [int(x) for x in pred]
        
        # Calculate correlation with ground truth
        corr = pearsonr(pred[-16:], ground_true[-16:])
        df.at[i, "correlation"] = round(corr[0], 3)
        df.at[i, "p_value"] = round(corr[1], 3)
        
        if (label == "Case" and "Case" in model_ls) or (
            label in model_ls and swap in swap_ls
        ):
            text = getMap(label)
            if swap:
                text += " (w/ CSR)"
            plt.plot(pred, label=f"{text} (r={corr[0]:.2f})", color=color_ls[counter])
            counter += 1

    plt.ylabel("Dengue Cases")
    plt.xlabel("Week")
    plt.title(f"Dengue Prediction for {city_name}")
    plt.legend(loc='upper left')
    
    # Create directory if it doesn't exist
    os.makedirs(folder, exist_ok=True)
    
    plt.savefig(folder / f"{name}.png", dpi=300, bbox_inches='tight')
    
    # Save correlation data
    df = df.drop(columns=["Prediction"])
    df.to_csv(folder / "correlation.csv")
    
    plt.close()

def getMap(label):
    """Map model codes to readable names."""
    if label == "Case":
        return "Case"
    elif label == "FengVit":
        return "ViT+FEng"
    elif label == "VitFengCase":
        return "ViT+FEng+Case"
    elif label == "Feng":
        return "FEng"
    elif label == "Vit":
        return "ViT"
    return label

def generatePredictions(args, city_ls):
    """Generate predictions for all models and cities."""
    selected_feature_ls = SELECTED_FEATURES
    cloud = CLOUD_THRESHOLD
    shadow = SHADOW_THRESHOLD
    lstm_week = 5
    len_callback = 10
    leaky_rate = 0.2
    
    # Create results directory
    results_dir = Path(f"{RESULTS_PATH}/demo")
    os.makedirs(results_dir, exist_ok=True)
    
    # Initialize predictions dataframe
    predictions_df = pd.DataFrame(columns=["City", "Model", "Swap", "Prediction", "MAE", "RMSE"])
    
    for city in city_ls:
        path = Path(f"{BASE_DATA_PATH}/sorted/{city}")
        df = pd.read_csv(path / "label.csv")
        all_feature_ls = readFeatureName(df, path)
        
        # Create city results directory
        city_dir = results_dir / city
        os.makedirs(city_dir, exist_ok=True)

        # Test different models
        for model_name in ["FengVit", "Vit", "Feng", "Case", "VitFengCase"]:
            for swap in [True, False]:
                if model_name == "Case" and swap:
                    continue  # Skip Case with swap
                
                print(f"Processing {model_name} (swap={swap}) for city {city}")
                
                feature_folder_name = getFeatureFolderName(
                    all_feature_ls, selected_feature_ls
                )
                
                setting = getSetting(
                    args.project_folder,
                    swap,
                    model_name,
                    city,
                    include_top=False,
                    threshold_dic=None,
                    selected_feature_ls=selected_feature_ls,
                    threshold_cloud=cloud,
                    threshold_shadow=shadow,
                    feature_folder_name=feature_folder_name,
                    lstm_week=lstm_week,
                )
                
                # Add India-specific settings
                setting["country"] = args.country
                
                # Setup data
                if args.country.lower() == "india":
                    setting, data, labels, scaler = setup_india(setting, city)
                else:
                    setting, data, labels, scaler = setup(setting, city)
                
                data = getInput(model_name, data, labels)
                
                # Create and train model
                model = createModel(setting, leaky_rate)
                history = model.fit(
                    data["train"]["input"],
                    data["train"]["output"],
                    epochs=50,  # Reduced for demo
                    batch_size=8,
                    validation_data=(data["val"]["input"], data["val"]["output"]),
                    callbacks=getCallback2(len_callback),
                    verbose=1
                )
                
                # Generate predictions
                predictions = {}
                metrics = {}
                
                for split in ["train", "val", "test"]:
                    scaled_pred = model.predict(data[split]["input"])
                    pred = np.around(scaler.inverse_transform(scaled_pred).flatten())
                    predictions[split] = pred
                    
                    # Calculate metrics
                    mae = np.mean(np.abs(pred - data[split]["origin_output"]))
                    rmse = np.sqrt(np.mean((pred - data[split]["origin_output"])**2))
                    metrics[split] = {"MAE": mae, "RMSE": rmse}
                
                # Combine all predictions
                all_pred = np.concatenate([predictions["train"], predictions["val"], predictions["test"]])
                
                # Add to dataframe
                predictions_df = predictions_df.append({
                    "City": int(city),
                    "Model": model_name,
                    "Swap": swap,
                    "Prediction": " ".join(map(str, all_pred)),
                    "MAE": metrics["test"]["MAE"],
                    "RMSE": metrics["test"]["RMSE"]
                }, ignore_index=True)
    
    # Save predictions
    predictions_df.to_csv(results_dir / "predictions.csv", index=False)
    print(f"Predictions saved to {results_dir / 'predictions.csv'}")
    
    return predictions_df

def main(args):
    city_ls = getCityList(args.reverse_city_sequence, args.country)
    
    if args.city is not None:
        city_ls = [city_ls[args.city]]
    
    # Generate predictions
    generatePredictions(args, city_ls)
    
    # Plot predictions
    plotPredictions(city_ls)

if __name__ == "__main__":
    args = setParser()
    os.environ["CUDA_VISIBLE_DEVICES"] = args.gpu_index
    gpus = tf.config.list_physical_devices("GPU")

    if gpus:
        try:
            if args.limit_gpu:
                tf.config.set_logical_device_configuration(
                    gpus[0],
                    [
                        tf.config.LogicalDeviceConfiguration(
                            memory_limit=args.gpu_size * 1024
                        )
                    ],
                )
            logical_gpus = tf.config.list_logical_devices("GPU")
            print(len(gpus), "Physical GPUs,", len(logical_gpus), "Logical GPUs")
        except RuntimeError as e:
            print(e)

    main(args)

