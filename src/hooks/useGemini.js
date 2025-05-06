import { useState, useCallback } from 'react';

/**
 * Custom hook for interacting with Google's Gemini AI API
 * @returns {Object} Functions and state for Gemini AI interactions
 */
const useGemini = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // API key would typically come from environment variables
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY";
  const baseUrl = "https://generativelanguage.googleapis.com/v1beta/models";
  const model = "gemini-pro";

  /**
   * Generate text using Gemini AI
   * @param {string} prompt - The prompt to send to Gemini
   * @param {Object} options - Additional options for the API call
   * @returns {Promise<Object>} The response from Gemini
   */
  const generateText = useCallback(async (prompt, options = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${baseUrl}/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: options.temperature || 0.7,
              topK: options.topK || 40,
              topP: options.topP || 0.95,
              maxOutputTokens: options.maxOutputTokens || 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to generate text with Gemini');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiKey, model]);

  /**
   * Generate farm recommendations based on input data
   * @param {Object} farmData - Data about the farm
   * @returns {Promise<Object>} Recommendations for the farm
   */
  const generateFarmRecommendations = useCallback(async (farmData) => {
    const prompt = `
      I need recommendations for a farm with the following characteristics:
      - Location: ${farmData.location || 'Unknown'}
      - Size: ${farmData.size || 'Unknown'} acres
      - Current crops: ${farmData.crops?.join(', ') || 'None'}
      - Soil type: ${farmData.soilType || 'Unknown'}
      - Climate: ${farmData.climate || 'Unknown'}
      - Equipment available: ${farmData.equipment?.join(', ') || 'Unknown'}
      - Goals: ${farmData.goals?.join(', ') || 'Sustainable farming'}
      
      Please provide recommendations for:
      1. Sustainable farming practices
      2. Crop rotation suggestions
      3. Resource optimization
      4. Carbon footprint reduction
      5. Potential for carbon credits
    `;

    return generateText(prompt, { temperature: 0.5 });
  }, [generateText]);

  /**
   * Analyze soil data and provide insights
   * @param {Object} soilData - Data about the soil
   * @returns {Promise<Object>} Insights about the soil
   */
  const analyzeSoilData = useCallback(async (soilData) => {
    const prompt = `
      Analyze the following soil data and provide insights:
      - pH level: ${soilData.ph || 'Unknown'}
      - Nitrogen content: ${soilData.nitrogen || 'Unknown'}
      - Phosphorus content: ${soilData.phosphorus || 'Unknown'}
      - Potassium content: ${soilData.potassium || 'Unknown'}
      - Organic matter: ${soilData.organicMatter || 'Unknown'}
      - Texture: ${soilData.texture || 'Unknown'}
      
      Please provide:
      1. Soil health assessment
      2. Recommended amendments
      3. Suitable crops for this soil type
      4. Sustainable management practices
    `;

    return generateText(prompt, { temperature: 0.3 });
  }, [generateText]);

  return {
    loading,
    error,
    result,
    generateText,
    generateFarmRecommendations,
    analyzeSoilData
  };
};

export default useGemini;
