/**
 * Development Configuration
 * 
 * This file contains configuration settings for development mode.
 * Modify these settings to control development features.
 */

// DEVELOPMENT MODE SETTINGS
// Set this to true to use mock data and bypass real API calls
export const USE_DEV_MODE = false;

// Mock user for authentication testing
export const MOCK_USER = {
  uid: 'test-user-id',
  email: 'test@example.com',
  displayName: 'Test Farmer',
  emailVerified: true,
  // Add any other user properties needed for testing
};

// Development environment indicator
// This will be displayed in the app to indicate development mode is active
export const DEV_INDICATOR = {
  show: true,           // Whether to show the indicator
  label: 'DEV MODE',    // Text to display
  position: 'topRight', // Position: 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'
};
