import requests

url = "http://127.0.0.1:5000/recommend"

payload = {
    "latitude": -6.2,
    "longitude": 106.8,
    "country": "India",
    "soil": {
        "ph": 6.4,
        "clay": 22,
        "ocd": 1.8,
        "bdod": 1.3
    }
}

response = requests.post(url, json=payload)

print("Status Code:", response.status_code)
print("Response JSON:", response.json())
