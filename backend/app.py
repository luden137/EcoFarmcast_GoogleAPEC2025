import sys
import os
from flask import Flask, request, jsonify

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from model.recommender import recommend_crop
from api_client.soil_api import get_soil_features

app = Flask(__name__)

@app.route("/recommend", methods=["POST"])
def recommend():
    req_data = request.json
    lat = req_data.get("latitude")
    lon = req_data.get("longitude")
    country = req_data.get("country", "India")

    # Determine whether to use custom soil data
    if req_data.get("use_custom_soil"):
        soil = req_data.get("soil", {})
    else:
        soil = get_soil_features(lat, lon)

    # Recommendation logic encapsulated in recommender_crop
    result = recommend_crop(lat, lon, country, manual_soil_data=soil)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)

