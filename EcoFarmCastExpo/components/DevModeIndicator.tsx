import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { USE_DEV_MODE, DEV_INDICATOR } from '@/src/config/devConfig';

/**
 * Development Mode Indicator
 * 
 * Displays a visual indicator when the app is running in development mode
 * with mock data. This helps users distinguish between real and test data.
 */
export default function DevModeIndicator() {
  // Don't render anything if dev mode is disabled or indicator is hidden
  if (!USE_DEV_MODE || !DEV_INDICATOR.show) {
    return null;
  }

  // Determine position styles based on configuration
  const positionStyle = getPositionStyle(DEV_INDICATOR.position);

  return (
    <View style={[styles.container, positionStyle]}>
      <Text style={styles.text}>{DEV_INDICATOR.label}</Text>
    </View>
  );
}

/**
 * Get position styles based on the configured position
 */
function getPositionStyle(position: string) {
  switch (position) {
    case 'topLeft':
      return styles.topLeft;
    case 'topRight':
      return styles.topRight;
    case 'bottomLeft':
      return styles.bottomLeft;
    case 'bottomRight':
      return styles.bottomRight;
    default:
      return styles.topRight; // Default position
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 9999,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  topLeft: {
    top: 40,
    left: 10,
  },
  topRight: {
    top: 40,
    right: 10,
  },
  bottomLeft: {
    bottom: 10,
    left: 10,
  },
  bottomRight: {
    bottom: 10,
    right: 10,
  },
});
