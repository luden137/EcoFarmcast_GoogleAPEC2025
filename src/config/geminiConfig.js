export const geminiConfig = {
  // API Configuration
  api: {
    defaultModel: "gemini-pro",
    maxTokens: 1024,
    defaultTemperature: 0.7
  },

  // Page-specific Configurations
  pages: {
    crops: {
      basePrompt: `You are an agricultural AI assistant specializing in crop analysis. Help the user understand:
        - Current crop performance metrics
        - Growth stage analysis
        - Yield predictions
        - Pest and disease risks
        - Recommended actions`,
      
      suggestionChips: [
        "Analyze crop health",
        "Predict yield",
        "Check disease risks",
        "Growth timeline",
        "Improvement tips"
      ],
      
      contextTemplate: (pageData) => ({
        content: `Analyzing crop data for:
                 Primary Crop: ${pageData?.result?.primaryCrop || 'Not specified'}
                 Secondary Crop: ${pageData?.result?.secondaryCrop || 'Not specified'}
                 Water Needs: ${pageData?.result?.waterNeeds || 'Unknown'}
                 Climate Match: ${pageData?.result?.climateMatch || 'Unknown'}
                 Soil Type: ${pageData?.result?.soilType || 'Unknown'}
                 Growing Season: ${pageData?.result?.growingSeason || 'Unknown'}`
      })
    },

    carbon: {
      basePrompt: `You are a carbon footprint analysis expert. Help the user understand:
        - Current carbon emissions
        - Carbon reduction opportunities
        - Sustainable practices
        - Carbon credit potential
        - Environmental impact`,
      
      suggestionChips: [
        "Current emissions",
        "Reduction strategies",
        "Carbon credits",
        "Best practices",
        "Impact analysis"
      ],
      
      contextTemplate: (pageData) => ({
        content: `Analyzing carbon data:
                 Status: ${pageData?.status || 'In Progress'}
                 Current Emissions: ${pageData?.emissions || 'Not available'}
                 Reduction Target: ${pageData?.target || 'Not set'}
                 Credit Eligibility: ${pageData?.creditEligible ? 'Yes' : 'No'}`
      })
    },

    energy: {
      basePrompt: `You are an agricultural energy efficiency expert. Help the user understand:
        - Energy consumption patterns
        - Efficiency opportunities
        - Renewable energy potential
        - Cost optimization
        - Sustainable practices`,
      
      suggestionChips: [
        "Energy usage",
        "Cost analysis",
        "Efficiency tips",
        "Renewable options",
        "ROI calculator"
      ],
      
      contextTemplate: (pageData) => ({
        content: `Analyzing energy data:
                 Status: ${pageData?.status || 'In Progress'}
                 Current Usage: ${pageData?.usage || 'Not available'}
                 Peak Times: ${pageData?.peakTimes || 'Unknown'}
                 Efficiency Score: ${pageData?.efficiencyScore || 'Not calculated'}`
      })
    }
  },

  // Chat Settings
  chat: {
    maxHistory: 10,
    defaultSystemPrompt: `You are EcoFarmCast AI, an expert agricultural assistant.
                         Always provide practical, actionable advice based on:
                         - Scientific farming principles
                         - Sustainable practices
                         - Regional considerations
                         - Economic viability`,
    
    responseFormat: {
      structure: "markdown",
      maxLength: 500,
      includeSources: true
    }
  },

  // Memory Management
  memory: {
    retainContextCount: 5,
    priorityTags: ["critical", "warning", "action_required"],
    contextExpiry: 30 * 60 * 1000 // 30 minutes
  },

  // Error Messages
  errorMessages: {
    apiError: "I encountered an issue while processing your request. Please try again.",
    contextMissing: "I'm missing some important context. Could you provide more details?",
    invalidInput: "I couldn't understand that input. Could you rephrase it?"
  }
};
