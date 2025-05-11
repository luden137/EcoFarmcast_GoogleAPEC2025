import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme, View } from 'react-native';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { AuthProvider } from '../src/context/AuthContext';
import { GeminiProvider } from '../src/context/GeminiContext';
import DevModeIndicator from '../components/DevModeIndicator';
import React from 'react';

// Create a custom theme for the app
const appTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2e7d32', // Green - representing eco-friendliness and agriculture
    primaryContainer: '#60ad5e',
    secondary: '#1565c0', // Blue - representing water and technology
    secondaryContainer: '#5e92f3',
    error: '#d32f2f',
    background: '#f5f5f5',
    surface: '#ffffff',
  },
  roundness: 8,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'home',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider theme={appTheme}>
        <AuthProvider>
          <GeminiProvider>
            <View style={{ flex: 1 }}>
              <Stack>
                <Stack.Screen name="home" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                <Stack.Screen name="analysis" options={{ headerShown: false }} />
                <Stack.Screen name="data_entry" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
              </Stack>
              {/* Development mode indicator */}
              <DevModeIndicator />
            </View>
          </GeminiProvider>
        </AuthProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}
