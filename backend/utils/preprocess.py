# utils/encode_features_full.py
import numpy as np
import joblib
import os

ENCODER_PATH = os.path.join(os.path.dirname(__file__), "..", "model", "encoder.pkl")
encoder = joblib.load(ENCODER_PATH)

NUMERIC_FEATURE_ORDER = [
    "ph", "temperature", "humidity", "windspeed",
    "N", "P", "K", "soil_quality_index"
]

DEFAULTS = {
    "Crop_Type": "Wheat",
    "Soil_Type": "Loamy",
    "ph": 6.5,
    "temperature": 25.0,
    "humidity": 60.0,
    "windspeed": 5.0,
    "N": 50,
    "P": 50,
    "K": 50,
    "soil_quality_index": 20
}


def encode_features(raw_features):
    """
    Encode categorical and numeric features into the full model input format.
    - raw_features: dict with keys like 'Crop_Type', 'Soil_Type', 'ph', ...
    - returns: numpy array of shape (1, n_features)
    """
    # 1. Extract and encode category features
    crop = raw_features.get("Crop_Type", DEFAULTS["Crop_Type"])
    soil = raw_features.get("Soil_Type", DEFAULTS["Soil_Type"])
    cat_array = encoder.transform([[crop, soil]])  # shape: (1, ?)

    # 2. Extract and concatenate numerical features in order
    num_values = [raw_features.get(key, DEFAULTS[key]) for key in NUMERIC_FEATURE_ORDER]
    num_array = np.array([num_values])  # shape: (1, 8)

    # 3. Splicing and returning
    return np.hstack([cat_array, num_array])
