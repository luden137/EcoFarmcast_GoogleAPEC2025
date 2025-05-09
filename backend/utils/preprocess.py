import numpy as np

# Define the order of fields used in the model
FEATURE_ORDER = [
    "avg_temp", "rainfall", "sunlight",
    "ph", "clay", "sand", "ocd", "bdod",
    "price", "volatility", "export_ratio"
]

def encode_features(raw_features):
    """
    Convert the input features in dict format into a numpy array, in order of FEATURE-ORDER.
    If a field is missing, fill in the default value.
    """
    defaults = {
        "avg_temp": 25.0,
        "rainfall": 1000.0,
        "sunlight": 2000,
        "ph": 6.5,
        "clay": 20.0,
        "sand": 30.0,
        "ocd": 3.0,
        "bdod": 1.3,
        "price": 200.0,
        "volatility": 0.1,
        "export_ratio": 0.2
    }

    features = []
    for key in FEATURE_ORDER:
        value = raw_features.get(key, defaults[key])
        features.append(value)

    return np.array([features])
