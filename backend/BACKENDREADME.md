
1. `backend/app.py`:

- Main Flask application entry point
- Provides a `/recommend` endpoint that accepts POST requests
- Takes latitude, longitude, and country as inputs
- Can handle both API-fetched and custom soil data
- Returns crop recommendations with yield predictions

2. `backend/model/recommender.py`:

- Core recommendation engine

- Uses a pre-trained machine learning model (trained_model.pkl)

- Evaluates multiple crops (wheat, rice, maize, barley)

- Combines soil, climate, and market data to predict:

  - Expected crop yield
  - Potential revenue
  - Best crop recommendation

- Returns detailed analysis including soil and climate features

3. API Clients (`backend/api_client/`):

a. `soil_api.py`:

- Interfaces with ISRIC SoilGrids API
- Fetches soil properties like pH and clay content
- Provides soil quality metrics (N, P, K levels)
- Returns standardized soil feature data

b. `weather_api.py`:

- Integrates with OpenWeatherMap API

- Fetches current weather data including:

  - Temperature
  - Humidity
  - Wind speed

- Converts weather data to metric units

c. `market_api.py`:

- Simulates market data for different crops

- Provides mock price data for different countries

- Includes market metrics like:

  - Crop prices (USD/ton)
  - Market volatility
  - Export ratios

- Has default fallback values for unknown crops/countries

4. `backend/utils/preprocess.py` (referenced but not shown):

- Contains data preprocessing utilities
- Includes the encode_features_harvestsense function for model input preparation
