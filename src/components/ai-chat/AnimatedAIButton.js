import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimatedAIButton = ({ onPress, loading, hasUpdates }) => {
  const theme = useTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const notificationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      // Start rotation animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Start pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Stop animations
      rotateAnim.setValue(0);
      pulseAnim.setValue(1);
    }
  }, [loading, rotateAnim, pulseAnim]);

  useEffect(() => {
    if (hasUpdates) {
      // Start notification animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(notificationAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(notificationAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Stop notification animation
      notificationAnim.setValue(0);
    }
  }, [hasUpdates, notificationAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const notificationOpacity = notificationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={styles.container}
    >
      {hasUpdates && (
        <Animated.View
          style={[
            styles.notification,
            {
              backgroundColor: theme.colors.error,
              opacity: notificationOpacity,
            },
          ]}
        />
      )}
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor: theme.colors.primary,
            transform: [
              { scale: pulseAnim },
              { rotate },
            ],
          },
        ]}
      >
        <Icon
          name={loading ? 'robot-excited' : hasUpdates ? 'robot-excited' : 'robot'}
          size={24}
          color="white"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  notification: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
    zIndex: 1,
  },
});

export default AnimatedAIButton;
