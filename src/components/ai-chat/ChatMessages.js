import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, ActivityIndicator, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatMessages = ({ messages, loading, error }) => {
  const theme = useTheme();

  const renderMessage = (message, index) => {
    const isUser = message.isUser;
    const isError = message.isError;
    
    const messageStyle = [
      styles.message,
      isUser ? styles.userMessage : styles.aiMessage,
      isError ? styles.errorMessage : null,
      { 
        backgroundColor: isError 
          ? '#FFF3F3' 
          : isUser 
            ? theme.colors.primary 
            : theme.colors.surface 
      }
    ];

    const textStyle = [
      styles.messageText,
      { 
        color: isError 
          ? theme.colors.error
          : isUser 
            ? 'white' 
            : theme.colors.text 
      },
      isError && styles.errorText
    ];

    return (
      <View key={index} style={[styles.messageContainer, isUser ? styles.userContainer : styles.aiContainer]}>
        {!isUser && (
          <Icon 
            name={isError ? "alert" : "robot"}
            size={24} 
            color={isError ? theme.colors.error : theme.colors.primary}
            style={styles.icon}
          />
        )}
        <View style={messageStyle}>
          <Text style={textStyle}>{message.text}</Text>
          {message.timestamp && (
            <Text style={[
              styles.timestamp, 
              { 
                color: isError 
                  ? theme.colors.error 
                  : isUser 
                    ? 'rgba(255,255,255,0.7)' 
                    : theme.colors.placeholder 
              }
            ]}>
              {message.timestamp}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const renderError = () => {
    if (!error) return null;

    return (
      <View style={[styles.message, styles.errorMessage]}>
        <Icon name="alert" size={20} color={theme.colors.error} style={styles.errorIcon} />
        <Text style={[styles.messageText, { color: theme.colors.error }]}>
          {error}
        </Text>
      </View>
    );
  };

  const renderLoading = () => {
    if (!loading) return null;

    return (
      <View style={[styles.message, styles.loadingMessage]}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
        <Text style={[styles.messageText, { marginLeft: 8, color: theme.colors.primary }]}>
          Thinking...
        </Text>
      </View>
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {messages.map(renderMessage)}
      {renderError()}
      {renderLoading()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  aiContainer: {
    alignSelf: 'flex-start',
  },
  message: {
    padding: 12,
    borderRadius: 12,
    elevation: 1,
  },
  userMessage: {
    marginLeft: 'auto',
  },
  aiMessage: {
    marginRight: 'auto',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  icon: {
    marginRight: 8,
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
  errorMessage: {
    backgroundColor: '#FFF3F3',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    padding: 16,
    borderRadius: 8,
    minWidth: '90%'
  },
  errorText: {
    flexWrap: 'wrap',
    flex: 1
  },
  errorIcon: {
    marginRight: 8,
  },
  loadingMessage: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
});

export default ChatMessages;
