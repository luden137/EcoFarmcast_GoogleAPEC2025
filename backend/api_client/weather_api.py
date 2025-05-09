# backend/api_client/weather_api.py
import requests

API_KEY = "YOUR_OPENWEATHERMAP_KEY"
URL = "https://api.openweathermap.org/data/2.5/weather"

def get_climate_features(lat, lon):
    params = {
        "lat": lat,
        "lon": lon,
        "appid": API_KEY,
        "units": "metric"
    }

    r = requests.get(URL, params=params)
    d = r.json()

    return {
        "avg_temp": d["main"]["temp"],
        "humidity": d["main"]["humidity"],
        "windspeed": d["wind"]["speed"]
    }
