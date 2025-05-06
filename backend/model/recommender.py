import joblib
from api_client.weather_api import get_climate_features
from api_client.soil_api import get_soil_features
from api_client.market_api import get_market_price
from utils.preprocess import encode_features

model = joblib.load("model/trained_model.pkl")

def recommend_crop(lat, lon, country):
    climate = get_climate_features(lat, lon)
    soil = get_soil_features(lat, lon)
    market = get_market_price("wheat", country)

    raw_features = {
        "avg_temp": climate["avg_temp"],
        "rainfall": climate["rainfall"],
        "sunlight": climate["sunlight"],
        "soil_type": soil["soil_type"],
        "ph": soil["ph"],
        "price": market["price"],
        "volatility": market["volatility"],
        "export_ratio": market["export_ratio"],
        "country": country
    }

    X = encode_features(raw_features)
    prediction = model.predict([X])[0]
    
    return {
        "suitable": bool(prediction),
        "details": raw_features
    }
