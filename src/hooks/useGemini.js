import { useState, useCallback, useEffect } from 'react';
import { useGeminiContext } from '../context/GeminiContext';
import { generateContent, generatePageRecommendations } from '../services/gemini';

const useGemini = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    currentContext,
    updatePageContext,
    chatHistory,
    addToChatHistory,
    getSuggestions,
    clearHistory
  } = useGeminiContext();

  const setPageContext = useCallback((pageName, pageData) => {
    updatePageContext(pageName, pageData);
  }, [updatePageContext]);

  const generateText = useCallback(async (prompt, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Add user message to chat history
      const userMessage = {
        text: prompt,
        isUser: true,
        timestamp: new Date().toLocaleTimeString()
      };
      addToChatHistory(userMessage);

      // Generate AI response
      const response = await generateContent(prompt, currentContext, options);

      // Add AI response to chat history
      const aiMessage = {
        text: response.text,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
        suggestions: response.suggestions
      };
      addToChatHistory(aiMessage);

      return response;
    } catch (err) {
      console.error('Error in generateText:', err);
      setError(err.message || 'Failed to generate response');
      
      // Add error message to chat history
      const errorMessage = {
        text: `I apologize, but I encountered an issue: ${err.message || 'Failed to generate response'}. Please try again.`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };
      addToChatHistory(errorMessage);
      
      // Return error response instead of throwing
      return {
        text: errorMessage.text,
        suggestions: []
      };
    } finally {
      setLoading(false);
    }
  }, [currentContext, addToChatHistory]);

  const generateRecommendations = useCallback(async (data = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await generatePageRecommendations(currentContext, data);
      return response;
    } catch (err) {
      console.error('Error in generateRecommendations:', err);
      setError(err.message || 'Failed to generate recommendations');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentContext]);

  // Get suggestions based on current page context
  const suggestions = getSuggestions();

  return {
    loading,
    error,
    chatHistory,
    suggestions,
    generateText,
    generateRecommendations,
    setPageContext,
    clearHistory
  };
};

export default useGemini;
