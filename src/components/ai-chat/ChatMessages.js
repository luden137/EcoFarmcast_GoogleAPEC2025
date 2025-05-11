import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const Message = ({ text, isUser, timestamp }) => {
  const theme = useTheme();
  
  return (
    <View style={[
      styles.messageContainer,
      isUser ? styles.userMessage : styles.aiMessage
    ]}>
      <Text style={[
        styles.messageText,
        isUser ? { color: 'white' } : { color: 'black' }
      ]}>
        {text}
      </Text>
      <Text style={[
        styles.timestamp,
        isUser ? { color: 'rgba(255,255,255,0.7)' } : { color: 'rgba(0,0,0,0.5)' }
      ]}>
        {timestamp}
      </Text>
    </View>
  );
};

const ChatMessages = ({ messages }) => {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {messages.map((message, index) => (
        <Message
          key={index}
          text={message.text}
          isUser={message.isUser}
          timestamp={message.timestamp}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default ChatMessages;
