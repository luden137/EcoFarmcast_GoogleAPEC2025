# backend/api_client/market_api.py

def get_market_price(crop_name, country):
    # Simulate market prices, volatility, and export ratios in different countries
    mock_data = {
        "India": {
            "wheat": {
                "price": 230,         # USD/ton
                "volatility": 0.12,   # Market volatility
                "export_ratio": 0.25  # Export proportion
            },
            "rice": {
                "price": 310,
                "volatility": 0.15,
                "export_ratio": 0.3
            }
        },
        "Australia": {
            "wheat": {
                "price": 280,
                "volatility": 0.08,
                "export_ratio": 0.6
            },
            "rice": {
                "price": 350,
                "volatility": 0.18,
                "export_ratio": 0.2
            }
        }
    }

    # If the country or crop does not exist, give default values
    default = {
        "price": 250,
        "volatility": 0.10,
        "export_ratio": 0.20
    }

    return mock_data.get(country, {}).get(crop_name, default)
