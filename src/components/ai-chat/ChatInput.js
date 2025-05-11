import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, IconButton, useTheme } from 'react-native-paper';

const ChatInput = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = ({ nativeEvent: { key } }) => {
    if (key === 'Enter' && !disabled) {
      handleSend();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        value={message}
        onChangeText={setMessage}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        multiline
        disabled={disabled}
        style={styles.input}
        right={
          <TextInput.Icon
            icon="send"
            disabled={!message.trim() || disabled}
            onPress={handleSend}
            color={message.trim() && !disabled ? theme.colors.primary : theme.colors.disabled}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  input: {
    backgroundColor: 'white',
  },
});

export default ChatInput;
