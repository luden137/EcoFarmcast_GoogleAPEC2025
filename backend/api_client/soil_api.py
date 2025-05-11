import requests

import requests

def get_soil_features(lat, lon):
    url = (
        f"https://rest.isric.org/soilgrids/v2.0/properties/query"
        f"?lon={lon}&lat={lat}&property=phh2o&property=nitrogen"
        f"&depth=0-30cm&value=mean"
    )

    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()

        data = response.json()
        ph = data['properties']['phh2o']['mean']
        nitrogen = data['properties']['nitrogen']['mean']

        return {
            "ph": ph,
            "N": nitrogen,
            "P": 50,
            "K": 50,
            "soil_quality_index": 20
        }

    except Exception as e:
        print(f"⚠️ Soil API fallback due to: {e}")
        return {
            "ph": 6.5,
            "N": 50,
            "P": 50,
            "K": 50,
            "soil_quality_index": 20
        }



