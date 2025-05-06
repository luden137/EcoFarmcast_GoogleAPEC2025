import requests

API_KEY = "YOUR_OPENWEATHERMAP_KEY"
URL = "https://api.openweathermap.org/data/2.5/onecall"

def get_climate_features(lat, lon):
    params = {
        "lat": lat,
        "lon": lon,
        "exclude": "minutely,hourly,daily,alerts",
        "appid": API_KEY,
        "units": "metric"
    }
    r = requests.get(URL, params=params)
    d = r.json()["current"]

    return {
        "avg_temp": d["temp"],
        "rainfall": d.get("rain", {}).get("1h", 0) * 24 * 365,  # rough estimate
        "sunlight": 2000  # 可用光照固定值，或从别处查
    }