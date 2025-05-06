import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { USE_DEV_MODE, MOCK_USER } from '../config/devConfig';

// Create the Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    if (USE_DEV_MODE) {
      // In development mode, use the mock user
      console.log('[DEV MODE] Development mode active - using mock user');
      setCurrentUser(MOCK_USER);
      setLoading(false);
      return () => {}; // No cleanup needed for mock user
    } else {
      // In production mode, use real Firebase authentication
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });

      // Cleanup subscription
      return unsubscribe;
    }
  }, []);

  // Sign up with email and password
  const signup = async (email, password, displayName) => {
    try {
      setLoading(true);
      
      if (USE_DEV_MODE) {
        // In development mode, simulate successful signup with mock user
        console.log('[DEV MODE] Development mode - simulating signup');
        // Create a custom mock user with the provided display name
        const customMockUser = {
          ...MOCK_USER,
          displayName: displayName || MOCK_USER.displayName,
          email: email || MOCK_USER.email
        };
        setCurrentUser(customMockUser);
        return customMockUser;
      }
      
      // Real signup in production mode
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
      
      // The user object should automatically update
      setCurrentUser(auth.currentUser);
      
      return userCredential.user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      if (USE_DEV_MODE) {
        // In development mode, simulate successful login with mock user
        console.log('[DEV MODE] Development mode - simulating login');
        setCurrentUser(MOCK_USER);
        return MOCK_USER;
      }
      
      // Real authentication in production mode
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoading(true);
      
      if (USE_DEV_MODE) {
        // In development mode, simulate logout
        console.log('[DEV MODE] Development mode - simulating logout');
        setCurrentUser(null);
        return;
      }
      
      // Real logout in production mode
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      if (USE_DEV_MODE) {
        // In development mode, simulate password reset
        console.log('[DEV MODE] Development mode - simulating password reset');
        Alert.alert(
          'Password Reset Email Sent (DEV MODE)',
          'This is a simulated password reset in development mode.'
        );
        return;
      }
      
      // Real password reset in production mode
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Password Reset Email Sent',
        'Check your email for instructions to reset your password.'
      );
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  };

  // Update profile
  const updateUserProfile = async (updates) => {
    try {
      setLoading(true);
      
      if (USE_DEV_MODE) {
        // In development mode, simulate profile update
        console.log('[DEV MODE] Development mode - simulating profile update');
        
        // Update the mock user with the new values
        const updatedUser = {
          ...MOCK_USER,
          ...(updates.displayName && { displayName: updates.displayName }),
          ...(updates.email && { email: updates.email })
        };
        
        setCurrentUser(updatedUser);
        return updatedUser;
      }
      
      // Real profile update in production mode
      const user = auth.currentUser;
      
      if (updates.displayName) {
        await updateProfile(user, {
          displayName: updates.displayName
        });
      }
      
      if (updates.email) {
        await updateEmail(user, updates.email);
      }
      
      // The user object should automatically update
      setCurrentUser(auth.currentUser);
      
      return auth.currentUser;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateProfile: updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
