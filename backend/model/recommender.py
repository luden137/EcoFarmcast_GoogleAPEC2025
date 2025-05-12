# backend/model/recommender.py

from api_client.weather_api import get_climate_features
from api_client.soil_api import get_soil_features
from api_client.market_api import get_market_price
from utils.preprocess import encode_features
import joblib
import os

# Model path (note that you need to train and generate it yourself)
model_path = os.path.join(os.path.dirname(__file__), "trained_model.pkl")
model = joblib.load(model_path)

def recommend_crop(lat, lon, country, manual_soil_data=None):
    """
    Obtain predicted crop yield using HarvestSense-style input features.

    Parameters:
    lat, lon: geographical location
    country: Country name
    manual_soil_data: optional, custom soil parameter dict (if empty, use API to obtain)

    return:
    Dict format, including model predicted yield and detailed features
    """

    # Step 1: Gather features (soil: manual or API)
    if manual_soil_data:
        soil = manual_soil_data
    else:
        soil = get_soil_features(lat, lon)

    climate = get_climate_features(lat, lon)

    candidate_crops = ["wheat", "rice", "maize", "barley"]

    best_crop = None
    best_revenue = -1
    best_yield = 0
    best_details = {}

    for crop in candidate_crops:
        market = get_market_price(crop, country)
        # Step 2: Merge features to match HarvestSense format
        features = {
            "Crop_Type": "Wheat",
            "Soil_Type": "Loamy",
            "ph": soil["ph"],
            "temperature": climate.get("avg_temp", 25.0),
            "humidity": climate.get("humidity", 60.0),
            "windspeed": climate.get("windspeed", 5.0),
            "N": soil.get("N", 50),
            "P": soil.get("P", 50),
            "K": soil.get("K", 50),
            "soil_quality_index": soil.get("soil_quality_index", 20),
        }

        # Step 3: Vectorize input
        X = encode_features(features)

        # Step 4: Predict yield
        predicted_yield = model.predict(X)[0]  # kg/m²

        price_per_kg = market["price"] 
        revenue = predicted_yield * price_per_kg  

        if revenue > best_revenue:
            best_crop = crop
            best_revenue = revenue
            best_yield = predicted_yield
            best_details = features
            best_details["price"] = price_per_kg

    # Step 5: Return prediction and inputs
    return {
        "recommended_crop": best_crop,
        "expected_yield_kg_per_m2": round(best_yield, 3),
        "expected_revenue_per_m2": round(best_revenue, 3),
        "details": best_details
    }