import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Surface, Card, Title, Text, useTheme, Divider } from 'react-native-paper';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import SuggestionChips from './SuggestionChips';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useGemini from '../../hooks/useGemini';

const { width } = Dimensions.get('window');

const AIChatSystem = ({ visible, currentTab, analysisState, onClose }) => {
  const theme = useTheme();
  const {
    loading,
    error,
    chatHistory,
    suggestions,
    generateText,
    setPageContext,
    clearHistory
  } = useGemini();

  useEffect(() => {
    const initializeChat = async () => {
      if (visible) {
        try {
          // Update page context when chat becomes visible
          setPageContext(currentTab, {
            analysisState,
            timestamp: new Date().toISOString()
          });

          // Add initial message if chat history is empty
          if (chatHistory.length === 0) {
            await generateText("Please provide an overview of the current analysis.", {
              temperature: 0.3
            });
          }
        } catch (err) {
          console.error('Error initializing chat:', err);
          // Error will be handled by the generateText function and displayed in chat
        }
      }
    };

    initializeChat();
  }, [visible, currentTab, analysisState, chatHistory.length, generateText, setPageContext]);

  const handleSendMessage = (text) => {
    generateText(text).catch(error => {
      console.error('Error sending message:', error);
      // Error will be handled by the generateText function and displayed in chat
    });
  };

  const handleSuggestionSelect = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const renderAnalysisSummary = () => {
    if (!analysisState) return null;

    return (
      <Card style={styles.summaryCard}>
        <Card.Content>
          <View style={styles.summaryHeader}>
            <Icon name="file-document-outline" size={24} color={theme.colors.primary} />
            <Title style={styles.summaryTitle}>Analysis Report</Title>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.summaryContent}>
            <Text style={styles.summaryText}>
              {`Current Analysis: ${currentTab}\n`}
              {`Status: ${analysisState.status || 'In Progress'}\n`}
              {analysisState.summary && `Summary: ${analysisState.summary}`}
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Surface style={styles.content}>
        <ChatHeader 
          currentTab={currentTab} 
          onClose={() => {
            clearHistory();
            onClose();
          }} 
        />
        {renderAnalysisSummary()}
        <ChatMessages 
          messages={chatHistory}
          loading={loading}
          error={error}
        />
        <SuggestionChips 
          suggestions={suggestions} 
          onSelect={handleSuggestionSelect}
        />
        <ChatInput 
          onSend={handleSendMessage}
          disabled={loading}
        />
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    position: 'absolute',
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  summaryCard: {
    margin: 16,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 18,
    marginLeft: 8,
  },
  summaryContent: {
    marginTop: 12,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
  },
  divider: {
    marginVertical: 8,
  },
});

export default AIChatSystem;
