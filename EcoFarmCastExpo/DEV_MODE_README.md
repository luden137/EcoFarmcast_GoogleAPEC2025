# EcoFarmCast Development Mode

This document explains how to use the development mode feature in the EcoFarmCast app. Development mode allows you to bypass authentication and use mock data for testing and development purposes.

## What is Development Mode?

Development mode is a special configuration that:

1. Bypasses Firebase authentication
2. Uses mock user data
3. Allows access to all app features without requiring login
4. Displays a visual indicator when active

## How to Toggle Development Mode

Development mode can be easily toggled by editing the `devConfig.js` file:

1. Open `src/config/devConfig.js`
2. Set `USE_DEV_MODE` to `true` to enable development mode or `false` to disable it:

```javascript
// Set this to true to use mock data and bypass real API calls
export const USE_DEV_MODE = true; // Change to false for production mode
```

## Mock User Configuration

You can customize the mock user data in the same file:

```javascript
// Mock user for authentication testing
export const MOCK_USER = {
  uid: 'test-user-id',
  email: 'test@example.com',
  displayName: 'Test Farmer', // Change this to test different user names
  emailVerified: true,
  // Add any other user properties needed for testing
};
```

## Development Mode Indicator

When development mode is active, a visual indicator appears on the screen. You can customize this indicator in the `devConfig.js` file:

```javascript
// Development environment indicator
export const DEV_INDICATOR = {
  show: true,           // Whether to show the indicator
  label: 'DEV MODE',    // Text to display
  position: 'topRight', // Position: 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'
};
```

## Best Practices

1. **Always disable development mode before building for production**
   - Set `USE_DEV_MODE = false` before creating production builds

2. **Use development mode for:**
   - Testing UI without needing to authenticate
   - Developing new features without backend dependencies
   - Debugging specific user scenarios by modifying the mock user

3. **Don't use development mode for:**
   - Testing actual authentication flows
   - Testing real API integrations
   - Performance testing

## Implementation Details

Development mode works by:

1. Using a mock user object instead of authenticating with Firebase
2. Bypassing authentication checks in the navigation system
3. Simulating authentication operations (login, signup, logout, etc.)

The implementation is primarily in:
- `src/config/devConfig.js` - Configuration settings
- `src/context/AuthContext.js` - Authentication handling
- `app/(tabs)/_layout.tsx` - Navigation authentication checks
- `components/DevModeIndicator.tsx` - Visual indicator
