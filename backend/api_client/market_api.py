# backend/api_client/market_api.py

import pandas as pd
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "FAO_statistics_prices_per_ton.csv")

df_prices = pd.read_csv(DATA_PATH)

def get_market_price(crop_name, country):
    """
    Get the market price per ton for the given crop and country.
    """
    try:
        row = df_prices[
            df_prices["Item"].str.lower().str.contains(crop_name.lower(), regex=False) &
            df_prices["Area"].str.lower().str.contains(country.lower(), regex=False)
        ].iloc[0]

        return {
            "price": float(row["Value"]),
            # "volatility": 0.1,
            # "export_ratio": 0.2
        }

    except IndexError:
        # fallback
        return {
            "price": 200.0,
            # "volatility": 0.1,
            # "export_ratio": 0.2
        }
