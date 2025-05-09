import requests

url = "https://rest.isric.org/soilgrids/v2.0/properties/query"

def get_soil_features(lat, lon):
    params = {
        "lon": lon,
        "lat": lat,
        "property": "phh2o,clay",
        "depth": "0-5cm"
    }
    r = requests.get(url, params=params)
    data = r.json()

    result = {
        "ph": data["properties"]["phh2o"]["values"]["0-5cm"]["mean"],
        "N": 40,  
        "P": 35,  
        "K": 45,   
        "soil_quality_index": 0.75  
    }

    return result
