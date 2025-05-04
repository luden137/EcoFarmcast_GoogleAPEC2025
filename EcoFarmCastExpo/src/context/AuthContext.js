import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { Alert } from 'react-native';

// Create the Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  // Sign up with email and password
  const signup = async (email, password, displayName) => {
    try {
      setLoading(true);
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      
      // Update user profile with display name
      await userCredential.user.updateProfile({
        displayName: displayName
      });
      
      // Refresh the user to get updated profile
      await userCredential.user.reload();
      setCurrentUser(auth().currentUser);
      
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
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
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
      await auth().signOut();
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
      await auth().sendPasswordResetEmail(email);
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
  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      const user = auth().currentUser;
      
      if (updates.displayName) {
        await user.updateProfile({
          displayName: updates.displayName
        });
      }
      
      if (updates.email) {
        await user.updateEmail(updates.email);
      }
      
      // Refresh the user to get updated profile
      await user.reload();
      setCurrentUser(auth().currentUser);
      
      return auth().currentUser;
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
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
