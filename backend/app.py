from flask import Flask, request, jsonify
from model.recommender import recommend_crop

app = Flask(__name__)

@app.route("/recommend", methods=["POST"])
def recommend():
    req_data = request.json
    lat = req_data.get("latitude")
    lon = req_data.get("longitude")
    country = req_data.get("country", "India")  # 默认国家

    result = recommend_crop(lat, lon, country)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)