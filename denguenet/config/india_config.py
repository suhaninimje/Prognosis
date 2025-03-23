"""
Configuration settings for DengueNet adaptation to Indian data.
"""
from pathlib import Path

# Base paths
BASE_DATA_PATH = Path("/path/to/indian/dataset")  # Update this to your actual data path
RESULTS_PATH = Path("/path/to/results/india")     # Update this to your desired results path

# City codes and names mapping for India
INDIA_CITIES = {
    "1001": "Mumbai",
    "1002": "Delhi",
    "1003": "Kolkata",
    "1004": "Chennai",
    "1005": "Bangalore"
}

# Thresholds for cloud and shadow detection
# These may need adjustment for Indian monsoon conditions
CLOUD_THRESHOLD = 75  # Slightly higher than Colombia due to monsoon cloud intensity
SHADOW_THRESHOLD = 8  # Slightly lower to account for dense cloud shadows

# Temporal parameters
# Indian dengue typically has different seasonal patterns than Colombia
LSTM_WEEKS = [5, 7, 9, 11]  # Consider longer sequences for capturing monsoon effects

# Selected features for radiomics
# Initial selection based on Colombian model, may need refinement
SELECTED_FEATURES = [
    "ClusterShade",
    "ClusterProminence", 
    "Skewness",
    "RunPercentage", 
    "JointAverage", 
    "ClusterTendency",
    "MeanAbsoluteDeviation", 
    "Idm",
    "Skewness", 
    "MCC",
    # Additional features that might be relevant for Indian conditions
    "Entropy",
    "LongRunHighGrayLevelEmphasis"
]

# Model configuration
DEFAULT_MODEL = "FengVit"  # Radiomics + ViT as default
LEAKY_RATE = 0.2
LEARNING_RATE = 1e-4

# Data split parameters (weeks)
TRAIN_WEEKS = 104  # 2 years
VAL_WEEKS = 26     # 6 months
TEST_WEEKS = 26    # 6 months

