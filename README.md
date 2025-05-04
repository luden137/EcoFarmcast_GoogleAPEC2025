 # EcoFarmCast

A React Native mobile application for sustainable farming management and analysis.

## Overview

EcoFarmCast is a mobile application that helps farmers implement sustainable agricultural practices, track farm data, and receive AI-powered recommendations. The app provides tools for data collection, analysis, and sustainability tracking.

## Features

- **User Authentication**: Secure login and registration system
- **Farm Data Management**: Record and manage soil conditions, crop details, and equipment usage
- **AI-Powered Analysis**: Get insights and recommendations based on your farm data
- **Sustainability Tracking**: Monitor environmental impact and explore carbon credit opportunities
- **Offline Support**: Access and update your data even without an internet connection

## Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Firebase project with Authentication, Firestore, and Storage enabled

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ecofarmcast.git
   cd ecofarmcast
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Configure Firebase:
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Authentication, Firestore, and Storage services
   - Update the Firebase configuration in `src/config/firebase.js` with your project credentials
   - Create a `.env` file in the root directory with your Firebase and API keys:
     ```
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
     REACT_APP_GEMINI_API_KEY=your-gemini-api-key
     ```

4. Run the app:
   
   For Android:
   ```
   npm run android
   # or
   yarn android
   ```
   
   For iOS (macOS only):
   ```
   npm run ios
   # or
   yarn ios
   ```

## Project Structure

```
src/
- assets/         # Images, fonts, and other static assets
- components/     # Reusable UI components
- config/         # Configuration files (Firebase, theme, etc.)
- context/        # React Context providers
- hooks/          # Custom React hooks
- navigation/     # Navigation configuration
- screens/        # App screens
- services/       # API and service integrations
- utils/          # Utility functions and helpers
```

## AI Integration

The app integrates with Google's Gemini AI to provide:

1. **Crop Recommendations**: Based on soil type, climate, and farm goals
2. **Carbon Credit Analysis**: Calculate potential carbon credits from sustainable practices
3. **Energy Optimization**: Recommendations for reducing energy usage and costs

## Development Notes

- The app uses React Native Paper for UI components
- Firebase is used for authentication, database, and storage
- The app supports both iOS and Android platforms
- Offline support is implemented using Firestore persistence

## License

[MIT License](LICENSE)
