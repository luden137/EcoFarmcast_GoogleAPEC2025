import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiConfig } from '../config/geminiConfig';
import { GEMINI_API_KEY } from "@env";

const {
  api: { defaultModel, maxTokens, defaultTemperature },
  errorMessages
} = geminiConfig;

// Initialize the Gemini client with the API key from environment variables
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Generate content using Gemini AI with context awareness
 * @param {string} prompt - The prompt to send to Gemini
 * @param {Object} context - The current page context
 * @param {Object} options - Additional options for the API call
 * @returns {Promise<Object>} The response from Gemini
 */
export const generateContent = async (prompt, context, options = {}) => {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    // Use the model from config
    const model = genAI.getGenerativeModel({ model: defaultModel });
    
    const pageConfig = geminiConfig.pages[context?.pageName];
    if (!pageConfig) {
      console.warn('No page config found for:', context?.pageName);
    }
    
    const enhancedPrompt = pageConfig 
      ? `${pageConfig.basePrompt}\n\n${prompt}`
      : prompt;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: enhancedPrompt }] }],
      generationConfig: {
        temperature: options.temperature || defaultTemperature,
        topK: options.topK || 40,
        topP: options.topP || 0.95,
        maxOutputTokens: options.maxOutputTokens || maxTokens,
      },
    });

    if (!result || !result.response) {
      throw new Error('Invalid response from Gemini API');
    }

    const response = await result.response;
    return {
      text: response.text(),
      suggestions: pageConfig?.suggestionChips || []
    };
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    // Return a more user-friendly error message
    return {
      text: `I apologize, but I encountered an issue: ${error.message}. Please try again.`,
      suggestions: []
    };
  }
};

/**
 * Generate content with agricultural context
 * @param {string} prompt - The prompt to send to Gemini
 * @param {Object} context - The current page context
 * @param {Object} farmData - Additional farm-specific data
 * @returns {Promise<Object>} The response from Gemini
 */
export const generateAgriculturalContent = async (prompt, context, farmData = {}) => {
  const enhancedPrompt = `
    Context: ${context.pageName} page
    Farm Details:
    - Location: ${farmData.location || 'Unknown'}
    - Size: ${farmData.size || 'Unknown'} acres
    - Current crops: ${farmData.crops?.join(', ') || 'None'}
    - Soil type: ${farmData.soilType || 'Unknown'}
    
    User Query: ${prompt}
    
    Please provide detailed, actionable insights based on this context.
  `;
  
  return generateContent(enhancedPrompt, context, {
    temperature: 0.4 // Lower temperature for more focused responses
  });
};

/**
 * Analyze farm data with context awareness
 * @param {Object} farmData - Data about the farm
 * @param {Object} context - The current page context
 * @returns {Promise<Object>} Analysis and recommendations
 */
export const analyzeFarmData = async (farmData, context) => {
  const pageConfig = geminiConfig.pages[context?.pageName];
  const contextPrompt = pageConfig?.contextTemplate?.(context.pageData) || '';

  const prompt = `
    ${contextPrompt}
    
    Analyze the following farm data and provide comprehensive recommendations:
    - Location: ${farmData.location || 'Unknown'}
    - Size: ${farmData.size || 'Unknown'} acres
    - Current crops: ${farmData.crops?.join(', ') || 'None'}
    - Soil type: ${farmData.soilType || 'Unknown'}
    - Climate: ${farmData.climate || 'Unknown'}
    - Equipment: ${farmData.equipment?.join(', ') || 'Unknown'}
    - Goals: ${farmData.goals?.join(', ') || 'Sustainable farming'}
    
    Please provide detailed recommendations for:
    1. Sustainable farming practices tailored to this specific farm
    2. Crop rotation and planting schedules
    3. Resource optimization (water, fertilizer, energy)
    4. Carbon footprint reduction strategies
    5. Potential for carbon credits and how to qualify
  `;
  
  return generateContent(prompt, context, { temperature: 0.5 });
};

/**
 * Generate page-specific recommendations
 * @param {Object} context - The current page context
 * @param {Object} data - Additional data for the recommendation
 * @returns {Promise<Object>} Page-specific recommendations
 */
export const generatePageRecommendations = async (context, data = {}) => {
  const pageConfig = geminiConfig.pages[context.pageName];
  if (!pageConfig) {
    throw new Error(errorMessages.contextMissing);
  }

  const contextData = pageConfig.contextTemplate(context.pageData);
  const prompt = `${pageConfig.basePrompt}\n\n${contextData.content}`;
  
  return generateContent(prompt, context, {
    temperature: 0.4,
    maxOutputTokens: maxTokens
  });
};

export default {
  generateContent,
  generateAgriculturalContent,
  analyzeFarmData,
  generatePageRecommendations
};
