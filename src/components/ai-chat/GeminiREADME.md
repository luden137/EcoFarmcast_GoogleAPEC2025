# Gemini AI Integration Guide

## Overview
The Gemini AI integration provides context-aware chat capabilities throughout the EcoFarmCast application. The system is designed to provide relevant insights and recommendations based on the current page and data context.

## Key Components

### 1. Configuration (src/config/geminiConfig.js)
- Page-specific prompts and context templates
- Suggestion chips for each analysis type
- Chat settings and memory management
- Error message templates

### 2. Service Layer (src/services/gemini.js)
- API integration with Gemini
- Content generation with context awareness
- Agricultural-specific content generation
- Farm data analysis capabilities

### 3. Context Management (src/context/GeminiContext.js)
- Chat history management
- Page context tracking
- Suggestion management
- Error state handling

### 4. UI Components
- AIChatSystem: Main chat interface
- ChatMessages: Message display
- ChatInput: User input handling
- SuggestionChips: Quick action suggestions
- AnimatedAIButton: Chat trigger button

## Usage

### 1. Setting Up
```javascript
// Add your Gemini API key to .env
REACT_APP_GEMINI_API_KEY=your_api_key_here
```

### 2. Implementing in a Screen
```javascript
import AIChatSystem from '../components/ai-chat/AIChatSystem';
import AnimatedAIButton from '../components/ai-chat/AnimatedAIButton';

const YourScreen = () => {
  const [showChat, setShowChat] = useState(false);
  
  return (
    <>
      <AIChatSystem 
        visible={showChat}
        currentTab="your_page_name"
        analysisState={yourData}
        onClose={() => setShowChat(false)}
      />
      
      <AnimatedAIButton
        onPress={() => setShowChat(true)}
        hasUpdates={false}
      />
    </>
  );
};
```

### 3. Adding a New Page Type
1. Add configuration in geminiConfig.js:
```javascript
pages: {
  yourPage: {
    basePrompt: `Your custom prompt...`,
    suggestionChips: ["Suggestion 1", "Suggestion 2"],
    contextTemplate: (pageData) => ({
      content: `Your template string...`
    })
  }
}
```

2. Update types if using TypeScript

### 4. Using the Hook
```javascript
const {
  loading,
  error,
  chatHistory,
  suggestions,
  generateText,
  setPageContext,
  clearHistory
} = useGemini();

// Generate AI response
await generateText("Your prompt");

// Update page context
setPageContext("page_name", { your: "data" });
```

## Features

### Context Awareness
- Each page type has its own specialized prompt
- Context templates format current page data
- Chat history is maintained per session

### Suggestion Chips
- Dynamic suggestions based on page context
- Quick access to common queries
- Context-aware recommendations

### Error Handling
- Graceful error recovery
- User-friendly error messages
- Network error handling

### Memory Management
- Chat history limitation
- Context expiration
- Priority tag system

## Best Practices

1. **Context Updates**
   - Update page context when navigation occurs
   - Include relevant data in context updates
   - Clear context when leaving a page

2. **Error Handling**
   - Always wrap API calls in try-catch
   - Provide user feedback for errors
   - Implement retry mechanisms

3. **Performance**
   - Limit chat history length
   - Clear unused contexts
   - Implement proper loading states

4. **User Experience**
   - Show loading states during generation
   - Provide clear error messages
   - Maintain chat continuity

## Troubleshooting

### Common Issues

1. "Something went wrong" error
   - Check API key configuration
   - Verify network connectivity
   - Check request format

2. Context not updating
   - Verify page context updates
   - Check context template format
   - Validate data structure

3. Suggestions not appearing
   - Check page configuration
   - Verify suggestion array format
   - Validate context updates

### Debug Tips

1. Enable console logging:
```javascript
const debugMode = true;
// In gemini.js
if (debugMode) console.log('API Response:', response);
```

2. Check network requests:
- Use browser dev tools
- Monitor API responses
- Verify request payloads

3. Validate context:
```javascript
console.log('Current Context:', currentContext);
console.log('Page Data:', pageData);
