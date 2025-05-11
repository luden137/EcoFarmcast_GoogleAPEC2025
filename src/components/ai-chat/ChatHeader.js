import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatHeader = ({ currentTab, onClose }) => {
  const theme = useTheme();

  return (
    <Appbar.Header style={styles.header}>
      <View style={styles.titleContainer}>
        <Icon 
          name="robot" 
          size={24} 
          color={theme.colors.primary}
          style={styles.icon}
        />
        <Text style={styles.title}>EcoFarmCast AI Assistant</Text>
      </View>
      <View style={styles.tabContainer}>
        <Text style={styles.tabText}>{currentTab}</Text>
      </View>
      <Appbar.Action 
        icon="close" 
        onPress={onClose}
        color={theme.colors.text}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 4,
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  tabContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 16,
  },
  tabText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
  },
});

export default ChatHeader;
