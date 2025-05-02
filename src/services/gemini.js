/**
 * Service for interacting with Google's Gemini AI API
 * This service provides low-level functions for making requests to the Gemini API
 */

// API key would typically come from environment variables
const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY";
const baseUrl = "https://generativelanguage.googleapis.com/v1beta/models";
const defaultModel = "gemini-pro";

/**
 * Generate content using Gemini AI
 * @param {string} prompt - The prompt to send to Gemini
 * @param {Object} options - Additional options for the API call
 * @returns {Promise<Object>} The response from Gemini
 */
export const generateContent = async (prompt, options = {}) => {
  const model = options.model || defaultModel;
  
  try {
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

    return await response.json();
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    throw error;
  }
};

/**
 * Generate content with a specific agricultural focus
 * @param {string} prompt - The prompt to send to Gemini
 * @param {Object} options - Additional options for the API call
 * @returns {Promise<Object>} The response from Gemini
 */
export const generateAgriculturalContent = async (prompt, options = {}) => {
  // Add agricultural context to the prompt
  const enhancedPrompt = `
    As an agricultural expert with knowledge of sustainable farming practices, 
    soil science, crop management, and environmental impact assessment, 
    please provide detailed information on the following:
    
    ${prompt}
    
    Include specific, actionable recommendations that are practical for farmers to implement.
  `;
  
  return generateContent(enhancedPrompt, {
    ...options,
    temperature: options.temperature || 0.4, // Lower temperature for more focused responses
  });
};

/**
 * Analyze farm data and generate recommendations
 * @param {Object} farmData - Data about the farm
 * @returns {Promise<Object>} Recommendations for the farm
 */
export const analyzeFarmData = async (farmData) => {
  const prompt = `
    Analyze the following farm data and provide comprehensive recommendations:
    - Location: ${farmData.location || 'Unknown'}
    - Size: ${farmData.size || 'Unknown'} acres
    - Current crops: ${farmData.crops?.join(', ') || 'None'}
    - Soil type: ${farmData.soilType || 'Unknown'}
    - Climate: ${farmData.climate || 'Unknown'}
    - Equipment available: ${farmData.equipment?.join(', ') || 'Unknown'}
    - Goals: ${farmData.goals?.join(', ') || 'Sustainable farming'}
    
    Please provide detailed recommendations for:
    1. Sustainable farming practices tailored to this specific farm
    2. Crop rotation and planting schedules
    3. Resource optimization (water, fertilizer, energy)
    4. Carbon footprint reduction strategies
    5. Potential for carbon credits and how to qualify
  `;
  
  return generateAgriculturalContent(prompt, { temperature: 0.5 });
};

/**
 * Generate crop recommendations based on soil and climate data
 * @param {Object} data - Soil and climate data
 * @returns {Promise<Object>} Crop recommendations
 */
export const generateCropRecommendations = async (data) => {
  const prompt = `
    Based on the following soil and climate conditions, recommend suitable crops:
    - Soil type: ${data.soilType || 'Unknown'}
    - Soil pH: ${data.soilPh || 'Unknown'}
    - Annual rainfall: ${data.rainfall || 'Unknown'}
    - Temperature range: ${data.temperatureRange || 'Unknown'}
    - Growing season: ${data.growingSeason || 'Unknown'}
    - Region: ${data.region || 'Unknown'}
    
    For each recommended crop, please provide:
    1. Expected yield per acre
    2. Water requirements
    3. Fertilizer recommendations
    4. Pest management considerations
    5. Market potential
  `;
  
  return generateAgriculturalContent(prompt, { temperature: 0.4 });
};

/**
 * Calculate carbon footprint and potential credits
 * @param {Object} farmData - Data about the farm
 * @returns {Promise<Object>} Carbon footprint analysis
 */
export const calculateCarbonImpact = async (farmData) => {
  const prompt = `
    Calculate the approximate carbon footprint for a farm with the following characteristics:
    - Size: ${farmData.size || 'Unknown'} acres
    - Current crops: ${farmData.crops?.join(', ') || 'None'}
    - Farming practices: ${farmData.practices?.join(', ') || 'Conventional'}
    - Equipment: ${farmData.equipment?.join(', ') || 'Standard agricultural equipment'}
    - Energy sources: ${farmData.energySources?.join(', ') || 'Grid electricity and diesel'}
    
    Then, suggest sustainable practices that could:
    1. Reduce this carbon footprint
    2. Potentially qualify for carbon credits
    3. Estimate the potential value of these carbon credits
    4. Outline the verification process needed
  `;
  
  return generateAgriculturalContent(prompt, { temperature: 0.3 });
};

export default {
  generateContent,
  generateAgriculturalContent,
  analyzeFarmData,
  generateCropRecommendations,
  calculateCarbonImpact
};
