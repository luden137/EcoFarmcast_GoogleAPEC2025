# EcoFarmCast Mobile

A React Native mobile application for sustainable farming management and analysis.

## Overview

EcoFarmCast Mobile is a cross-platform mobile application that helps farmers implement sustainable agricultural practices, track farm data, and receive AI-powered recommendations. The app provides tools for data collection, analysis, and sustainability tracking.

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
   git clone https://github.com/yourusername/ecofarmcast-mobile.git
   cd ecofarmcast-mobile
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

## Converting from Web to Mobile

This mobile app is a conversion of the EcoFarmCast web application. The conversion process involved:

1. **Component Replacement**: Replacing web-specific components with React Native equivalents
2. **Navigation**: Implementing React Navigation instead of React Router
3. **UI Adaptation**: Adapting the UI for mobile screens and touch interactions
4. **Firebase Integration**: Using React Native Firebase instead of web Firebase SDK
5. **Mobile Features**: Adding mobile-specific features like offline support

## Development Notes

- The app uses React Native Paper for UI components
- Firebase is used for authentication, database, and storage
- The app supports both iOS and Android platforms
- Offline support is implemented using Firestore persistence

## License

[MIT License](LICENSE)
