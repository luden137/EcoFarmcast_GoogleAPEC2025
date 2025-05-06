import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

// Define our custom colors
const colors = {
  primary: '#2e7d32', // Green - representing eco-friendliness and agriculture
  primaryLight: '#60ad5e',
  primaryDark: '#005005',
  secondary: '#1565c0', // Blue - representing water and technology
  secondaryLight: '#5e92f3',
  secondaryDark: '#003c8f',
  error: '#d32f2f',
  warning: '#ff9800',
  info: '#0288d1',
  success: '#388e3c',
  background: '#f5f5f5',
  surface: '#ffffff',
  text: '#000000',
  disabled: '#9e9e9e',
  placeholder: '#757575',
  backdrop: 'rgba(0, 0, 0, 0.5)',
};

// Create the light theme
export const lightTheme = {
  ...MD3LightTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: colors.primary,
    primaryContainer: colors.primaryLight,
    secondary: colors.secondary,
    secondaryContainer: colors.secondaryLight,
    error: colors.error,
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
    disabled: colors.disabled,
    placeholder: colors.placeholder,
    backdrop: colors.backdrop,
  },
  roundness: 8,
};

// Create the dark theme
export const darkTheme = {
  ...MD3DarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: colors.primaryLight,
    primaryContainer: colors.primary,
    secondary: colors.secondaryLight,
    secondaryContainer: colors.secondary,
    error: colors.error,
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    disabled: '#757575',
    placeholder: '#9e9e9e',
    backdrop: colors.backdrop,
  },
  roundness: 8,
};

// Export the default theme (light theme)
export const theme = lightTheme;
