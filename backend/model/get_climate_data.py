import requests

def get_climate_data(lat, lon):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "hourly": "temperature_2m,relative_humidity_2m,windspeed_10m",
        "current_weather": True
    }
    r = requests.get(url, params=params)
    if r.status_code == 200:
        weather = r.json()['current_weather']
        return {
            "avg_temp": weather['temperature'],
            "humidity": weather.get('relative_humidity', 60),
            "windspeed": weather['windspeed']
        }
    else:
        raise Exception(f"Weather API error: {r.status_code}")

if __name__ == "__main__":
    lat = 34.7
    lon = 113.6

    url = f"https://rest.isric.org/soilgrids/v2.0/properties/query?lon={lon}&lat={lat}"

    response = requests.get(url)

    print(get_climate_data(lat, lon))