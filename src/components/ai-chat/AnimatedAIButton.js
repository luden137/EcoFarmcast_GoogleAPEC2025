import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { FAB, Badge, useTheme } from 'react-native-paper';

const AnimatedAIButton = ({ onPress, currentTab, hasUpdates }) => {
  const theme = useTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (hasUpdates) {
      startPulseAnimation();
    } else {
      pulseAnim.setValue(1);
    }
  }, [hasUpdates]);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handlePress = () => {
    // Add rotation animation on press
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
      onPress();
    });
  };

  const getButtonColor = () => {
    switch(currentTab) {
      case 'crops':
        return theme.colors.primary;
      case 'carbon':
        return theme.colors.secondary;
      case 'energy':
        return theme.colors.tertiary;
      default:
        return theme.colors.primary;
    }
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={[
        styles.container,
        { 
          transform: [
            { scale: pulseAnim },
            { rotate: spin }
          ]
        }
      ]}>
        <FAB
          icon="robot"
          color="white"
          style={[styles.fab, { backgroundColor: getButtonColor() }]}
        />
        {hasUpdates && (
          <Badge
            size={12}
            style={[styles.badge, { backgroundColor: theme.colors.notification }]}
          />
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    elevation: 6,
  },
  fab: {
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
});

export default AnimatedAIButton;
