import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Surface,
  useTheme,
  IconButton
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../../hooks/useAuth';
import { auth } from '../../services/firebase';
import { useRouter } from 'expo-router';

const LoginScreen = ({ navigation }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const theme = useTheme();

  // Validate form
  const validateForm = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Email is required');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Email is invalid');
      return false;
    }

    if (!password) {
      Alert.alert('Error', 'Password is required');
      return false;
    }

    return true;
  };

  // Handle login
  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await login(email, password);
      // Navigation is handled by the AppNavigator based on auth state
    } catch (error) {
      let errorMessage = 'Failed to log in';

      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed login attempts. Please try again later.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      }

      Alert.alert('Login Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Surface style={styles.surface}>
            <Text style={styles.title}>Sign in to EcoFarmCast</Text>

            <TextInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              left={<TextInput.Icon icon="email" />}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              left={<TextInput.Icon icon="lock" />}
            />

            <Button
              icon="google"
              mode="outlined"
              onPress={async () => {
                try {
                  setLoading(true);
                  const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
                  const provider = new GoogleAuthProvider();
                  const result = await signInWithPopup(auth, provider);
                  const user = result.user;
                  console.log('Google Sign-In successful:', user);
                  router.replace('/home');
                  // Optionally navigate or update app state here
                } catch (error) {
                  console.error('Google Sign-In error:', error);
                  Alert.alert('Login Error', 'Google Sign-In failed');
                } finally {
                  setLoading(false);
                }
              }}
              style={[styles.button, { marginBottom: 8 }]}
            >
              Sign in with Google
            </Button>

            <Button
              mode="contained"
              onPress={router.replace('/home')}
              loading={loading}
              disabled={loading}
              style={styles.button}
            >
              Sign In
            </Button>
            
            <TouchableOpacity
              onPress={() => router.replace('/signup')}
              style={styles.linkContainer}
            >
              <Text style={styles.linkText}>
                Don&#39;t have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  surface: {
    padding: 24,
    elevation: 4,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    color: '#FFFFFF'
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
    paddingVertical: 6,
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  linkText: {
    color: '#4CAF50',
    fontSize: 16,
  },
});

export default LoginScreen;
