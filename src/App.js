import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './context/AuthContext';
import { GeminiProvider } from './context/GeminiContext';
import AppNavigator from './navigation/AppNavigator';
import theme from './config/theme';

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <GeminiProvider>
            <AppNavigator />
          </GeminiProvider>
        </AuthProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
