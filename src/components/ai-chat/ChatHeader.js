import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton, useTheme } from 'react-native-paper';

const ChatHeader = ({ currentTab, onClose }) => {
  const theme = useTheme();

  const getTabColor = () => {
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

  return (
    <View style={[styles.header, { borderBottomColor: getTabColor() }]}>
      <Text style={styles.title}>AI Assistant</Text>
      <Text style={[styles.subtitle, { color: getTabColor() }]}>
        {currentTab.charAt(0).toUpperCase() + currentTab.slice(1)} Analysis
      </Text>
      <IconButton
        icon="close"
        size={24}
        onPress={onClose}
        style={styles.closeButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    borderBottomWidth: 2,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
});

export default ChatHeader;
