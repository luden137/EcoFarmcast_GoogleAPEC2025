import { USE_DEV_MODE } from '../config/devConfig';

// Mock data for development
export const MOCK_MARKET_TRENDS = {
  crops: [
    { name: 'Wheat', price: 350, change: '+5%' },
    { name: 'Corn', price: 280, change: '-2%' },
    { name: 'Rice', price: 420, change: '+8%' },
    { name: 'Soybeans', price: 520, change: '+3%' },
    { name: 'Barley', price: 290, change: '-1%' },
    { name: 'Cotton', price: 680, change: '+4%' }
  ],
  marketSummary: {
    overallTrend: 'Upward',
    topPerformer: 'Cotton',
    averagePrice: 423,
    volatilityIndex: 'Medium'
  },
  lastUpdate: new Date().toLocaleString(),
  description: 'Market trends show strong performance in rice and cotton, with moderate volatility. Wheat and soybeans maintain steady growth while corn shows slight decline.'
};

export const MOCK_SOIL_TRENDS = {
  metrics: {
    ph: 6.5,
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    qualityIndex: 20
  },
  lastUpdate: new Date().toLocaleString(),
  description: 'Soil analysis indicates balanced pH levels with moderate nutrient content. Nitrogen, phosphorus, and potassium levels are at recommended ranges, though there\'s room for improvement in overall soil quality.'
};

export const MOCK_WEATHER_TRENDS = {
  current: {
    temperature: 25,
    humidity: 60,
    windspeed: 10
  },
  lastUpdate: new Date().toLocaleString(),
  description: 'Current weather conditions are favorable for most crops. Moderate temperature and humidity levels provide good growing conditions, while wind speeds remain at safe levels for plant development.'
};

/**
 * Get market trend data for crops
 * @param {string} country - Country for market data
 * @returns {Promise<Object>} Market trend data
 */
export const getMarketTrends = async (country = 'USA') => {
  try {
    if (USE_DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return MOCK_MARKET_TRENDS;
    }

    const response = await fetch('http://localhost:5000/market/trends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ country }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting market trends:', error);
    if (USE_DEV_MODE) {
      return MOCK_MARKET_TRENDS;
    }
    throw error;
  }
};

/**
 * Get soil analysis trend data
 * @param {Object} params - Parameters for soil data
 * @param {number} params.latitude - Farm latitude
 * @param {number} params.longitude - Farm longitude
 * @returns {Promise<Object>} Soil trend data
 */
export const getSoilTrends = async ({ latitude, longitude }) => {
  try {
    if (USE_DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return MOCK_SOIL_TRENDS;
    }

    const response = await fetch('http://localhost:5000/soil/analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ latitude, longitude }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting soil trends:', error);
    if (USE_DEV_MODE) {
      return MOCK_SOIL_TRENDS;
    }
    throw error;
  }
};

/**
 * Get weather trend data
 * @param {Object} params - Parameters for weather data
 * @param {number} params.latitude - Farm latitude
 * @param {number} params.longitude - Farm longitude
 * @returns {Promise<Object>} Weather trend data
 */
export const getWeatherTrends = async ({ latitude, longitude }) => {
  try {
    if (USE_DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return MOCK_WEATHER_TRENDS;
    }

    const response = await fetch('http://localhost:5000/weather/trends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ latitude, longitude }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting weather trends:', error);
    if (USE_DEV_MODE) {
      return MOCK_WEATHER_TRENDS;
    }
    throw error;
  }
};
