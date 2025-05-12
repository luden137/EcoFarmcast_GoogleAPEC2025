import requests

url = "http://127.0.0.1:5000/recommend"
payload = {
    "latitude": 34.7,
    "longitude": 113.6,
    "country": "China",
    "use_custom_soil": False 
}
response = requests.post(url, json=payload)

print("Status Code:", response.status_code)
print("Response JSON:", response.json())
