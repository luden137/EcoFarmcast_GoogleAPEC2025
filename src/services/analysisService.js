import { USE_DEV_MODE } from '../config/devConfig';

const MOCK_RECOMMENDATIONS = {
  crops: {
    primaryCrop: 'Wheat',
    secondaryCrop: 'Corn',
    waterNeeds: 'Medium',
    climateMatch: '85%',
    soilType: 'Loamy',
    growingSeason: 'Spring-Fall'
  }
};

/**
 * Get crop recommendations based on farm location and soil data
 * @param {Object} params - Parameters for the recommendation
 * @param {number} params.latitude - Farm latitude
 * @param {number} params.longitude - Farm longitude
 * @param {string} params.country - Farm country
 * @param {Object} [params.soil] - Optional soil data
 * @returns {Promise<Object>} - Recommendation results
 */
export const getCropRecommendations = async ({ latitude, longitude, country, soil = null }) => {
  try {
    if (USE_DEV_MODE) {
      // In development mode, return mock data after a simulated delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return MOCK_RECOMMENDATIONS.crops;
    }

    // In production mode, call the backend API
    const response = await fetch('http://localhost:5000/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude,
        longitude,
        country,
        use_custom_soil: !!soil,
        soil
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting crop recommendations:', error);
    if (USE_DEV_MODE) {
      // In development mode, fall back to mock data if the API call fails
      return MOCK_RECOMMENDATIONS.crops;
    }
    throw error;
  }
};
