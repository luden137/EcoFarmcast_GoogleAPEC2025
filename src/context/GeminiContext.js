import React, { createContext, useContext, useState, useCallback } from 'react';
import { geminiConfig } from '../config/geminiConfig';

const GeminiContext = createContext(null);

export const GeminiProvider = ({ children }) => {
  const [currentContext, setCurrentContext] = useState({
    pageName: '',
    pageData: {},
    userContext: {
      preferences: {},
      history: []
    }
  });

  const [chatHistory, setChatHistory] = useState([]);

  const updatePageContext = useCallback((pageName, pageData) => {
    setCurrentContext(prev => ({
      ...prev,
      pageName,
      pageData,
      timestamp: new Date().toISOString()
    }));
  }, []);

  const addToChatHistory = useCallback((message) => {
    setChatHistory(prev => {
      const newHistory = [...prev, message];
      if (newHistory.length > geminiConfig.chat.maxHistory) {
        return newHistory.slice(-geminiConfig.chat.maxHistory);
      }
      return newHistory;
    });
  }, []);

  const getCurrentPrompt = useCallback(() => {
    const pageConfig = geminiConfig.pages[currentContext.pageName];
    if (!pageConfig) return '';

    const contextData = pageConfig.contextTemplate(currentContext.pageData);
    return `${pageConfig.basePrompt}\n\n${contextData.content}`;
  }, [currentContext]);

  const getSuggestions = useCallback(() => {
    const pageConfig = geminiConfig.pages[currentContext.pageName];
    return pageConfig?.suggestionChips || [];
  }, [currentContext.pageName]);

  const clearHistory = useCallback(() => {
    setChatHistory([]);
  }, []);

  const value = {
    currentContext,
    updatePageContext,
    chatHistory,
    addToChatHistory,
    getCurrentPrompt,
    getSuggestions,
    clearHistory
  };

  return (
    <GeminiContext.Provider value={value}>
      {children}
    </GeminiContext.Provider>
  );
};

export const useGeminiContext = () => {
  const context = useContext(GeminiContext);
  if (!context) {
    throw new Error('useGeminiContext must be used within a GeminiProvider');
  }
  return context;
};
