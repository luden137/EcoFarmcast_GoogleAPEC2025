import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, IconButton, useTheme } from 'react-native-paper';

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message..."
        multiline
        maxLength={500}
        style={styles.input}
        right={
          <TextInput.Icon
            icon="send"
            onPress={handleSend}
            disabled={!message.trim()}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  input: {
    maxHeight: 100,
  },
});

export default ChatInput;
