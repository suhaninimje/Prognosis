"""
Data preparation script for Indian satellite imagery and dengue case data.
"""
import os
import sys
import argparse
import numpy as np
import pandas as pd
import pickle
from pathlib import Path
from skimage import io
from datetime import datetime

# Add parent directory to path for imports
root_dir = Path(__file__).parents[1]
sys.path.insert(0, str(root_dir))

from config.india_config import *
from util.DataPreprocess import *
from util.ForFeatureEngineering import *

def parse_args():
    parser = argparse.ArgumentParser(description='Prepare Indian data for DengueNet')
    parser.add_argument('--city', type=str, required=True, help='City code (e.g., 1001 for Mumbai)')
    parser.add_argument('--start_date', type=str, default='2018-01-01', help='Start date (YYYY-MM-DD)')
    parser.add_argument('--end_date', type=str, default='2021-12-31', help='End date (YYYY-MM-DD)')
    parser.add_argument('--image_dir', type=str, default=None, help='Directory containing satellite images')
    parser.add_argument('--case_file', type=str, default=None, help='CSV file with dengue case data')
    return parser.parse_args()

def create_directory_structure(city_code):
    """Create the expected directory structure for a city."""
    city_path = BASE_DATA_PATH / f"sorted/{city_code}"
    feature_path = city_path / "feature"
    image_path = city_path / "image"
    
    os.makedirs(city_path, exist_ok=True)
    os.makedirs(feature_path, exist_ok=True)
    os.makedirs(image_path, exist_ok=True)
    
    return city_path, feature_path, image_path

def process_case_data(case_file, city_code, start_date, end_date):
    """Process dengue case data and create label.csv file."""
    if case_file is None:
        case_file = BASE_DATA_PATH / f"raw/cases/{city_code}_cases.csv"
    
    # Load case data
    df = pd.read_csv(case_file)
    
    # Ensure date column is in datetime format
    df['date'] = pd.to_datetime(df['date'])
    
    # Filter by date range
    start = pd.to_datetime(start_date)
    end = pd.to_datetime(end_date)
    df = df[(df['date'] >= start) & (df['date'] <= end)]
    
    # Resample to weekly data if needed
    if 'week' not in df.columns:
        # Assuming daily data, resample to weekly
        df = df.set_index('date')
        df = df.resample('W-MON').sum().reset_index()
        df['week'] = df['date'].dt.strftime('%Y%V')  # ISO week format
    
    # Create epiweek column if not present
    if 'epiweek' not in df.columns:
        df['epiweek'] = df['week']
    
    # Ensure we have the required columns
    required_cols = ['epiweek', 'Cases']
    if 'Cases' not in df.columns and 'cases' in df.columns:
        df['Cases'] = df['cases']
    
    # Select and save relevant columns
    output_df = df[required_cols].copy()
    city_path = BASE_DATA_PATH / f"sorted/{city_code}"
    output_df.to_csv(city_path / "label.csv", index=False)
    
    return output_df

def process_satellite_images(image_dir, city_code, case_df):
    """Process satellite images and extract features."""
    if image_dir is None:
        image_dir = BASE_DATA_PATH / f"raw/satellite/{city_code}"
    
    city_path = BASE_DATA_PATH / f"sorted/{city_code}"
    feature_path = city_path / "feature"
    image_path = city_path / "image"
    
    # Radiomics settings
    radiomics_setting = {
        'binWidth': 5,
        'interpolator': 'sitkBSpline',
        'resampledPixelSpacing': None,
        'weightingNorm': None,
    }
    
    # Process each week's data
    for _, row in case_df.iterrows():
        epiweek = row['epiweek']
        
        # Find corresponding image file
        image_file = list(Path(image_dir).glob(f"*{epiweek}*.tif")) + list(Path(image_dir).glob(f"*{epiweek}*.tiff"))
        
        if not image_file:
            print(f"Warning: No image found for week {epiweek}")
            continue
            
        image_file = image_file[0]
        
        # Read and process image
        img = io.imread(image_file)
        
        # Save processed image to the expected location
        io.imsave(image_path / f"{epiweek}.tiff", img)
        
        # Extract radiomics features
        # Create a setting dictionary for feature extraction
        setting = {
            "num_tile": 11,  # 11x11 tiles
            "len_tile_11": 16,  # 16 pixels per tile
            "col": list(calculateRadiomics(img[:,:,0], radiomics_setting).keys())
        }
        
        # Calculate features for each tile
        features = {}
        for tile_idx in range(setting["num_tile"] * setting["num_tile"]):
            r_idx = tile_idx // setting["num_tile"]
            c_idx = tile_idx % setting["num_tile"]
            
            r = r_idx * setting["len_tile_11"]
            c = c_idx * setting["len_tile_11"]
            
            # Extract tile
            tile = img[r:r+setting["len_tile_11"], c:c+setting["len_tile_11"], 0]  # Using first band
            
            # Calculate radiomics features
            features[tile_idx] = calculateRadiomics(tile, radiomics_setting)
        
        # Save features
        with open(feature_path / f"{epiweek}.pickle", 'wb') as f:
            pickle.dump(features, f)
            
        print(f"Processed week {epiweek}")

def main():
    args = parse_args()
    
    print(f"Processing data for {INDIA_CITIES.get(args.city, args.city)}")
    
    # Create directory structure
    city_path, feature_path, image_path = create_directory_structure(args.city)
    
    # Process case data
    case_df = process_case_data(args.case_file, args.city, args.start_date, args.end_date)
    print(f"Processed case data: {len(case_df)} weeks")
    
    # Process satellite images
    process_satellite_images(args.image_dir, args.city, case_df)
    
    print("Data preparation complete!")

if __name__ == "__main__":
    main()

