import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Surface, Card, Title, Text, useTheme, Divider } from 'react-native-paper';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import SuggestionChips from './SuggestionChips';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const AIChatSystem = ({ visible, currentTab, analysisState, onClose }) => {
  const theme = useTheme();
  const [messages, setMessages] = useState([]);
  const slideAnim = useRef(new Animated.Value(visible ? 0 : width)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: visible ? 0 : width,
      useNativeDriver: true,
      tension: 20,
      friction: 7,
    }).start();

    // Add initial message when chat opens
    if (visible && messages.length === 0) {
      const initialMessage = {
        text: "I've generated a detailed report based on your farm's data. Here's what you need to know about the recommended crops:",
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([initialMessage]);
    }
  }, [visible]);

  const getSuggestions = () => {
    switch(currentTab) {
      case 'crops':
        return [
          "Explain the crop recommendation",
          "Show environmental impact",
          "What are the growing conditions?",
          "Expected yield for this corp",
          "Potential challenges"
        ];
      case 'carbon':
        return [
          "Explain carbon footprint",
          "Suggest reduction strategies",
          "Show credit opportunities",
          "Compare with industry average"
        ];
      case 'energy':
        return [
          "Explain energy usage",
          "Suggest optimization steps",
          "Show cost savings potential",
          "Compare with similar farms"
        ];
      default:
        return [];
    }
  };

  const handleSendMessage = (text) => {
    const newMessage = {
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, newMessage]);

    // Simulate AI response with more detailed answers
    setTimeout(() => {
      let response = "";
      switch(text) {
        case "Explain the crop recommendation":
          response = "Based on your soil analysis and climate data, Wheat and Corn are highly suitable for your farm. Wheat shows a 85% climate match and requires medium water needs, while Corn can be planted as a secondary crop during the warmer season.";
          break;
        case "Show environmental impact":
          response = "Growing these crops will have a positive environmental impact. The rotation between Wheat and Corn helps maintain soil health, reduces erosion, and promotes biodiversity. This combination typically requires 30% less fertilizer than continuous monoculture.";
          break;
        case "What are the growing conditions?":
          response = "Your farm's loamy soil is ideal for both crops. Wheat prefers temperatures between 15-24°C with moderate rainfall, while Corn thrives in warmer conditions (20-30°C). Your climate matches these requirements well throughout the growing season.";
          break;
        case "Expected yield for this corp":
          response = "With your soil conditions and climate, you can expect: \n- Wheat: 3.5-4.2 tons per hectare\n- Corn: 8-10 tons per hectare\nThese estimates are based on similar farms in your region.";
          break;
        case "Potential challenges":
          response = "Key challenges to watch for:\n1. Weather variability during critical growth stages\n2. Pest management, particularly for Corn\n3. Water management during dry spells\nI can provide specific mitigation strategies for each of these challenges.";
          break;
        default:
          response = "I'll analyze that aspect of the crops and provide you with detailed information...";
      }
      const aiResponse = {
        text: response,
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSuggestionSelect = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const renderAnalysisSummary = () => {
    switch(currentTab) {
      case 'crops':
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
                  Primary Recommendation: Wheat{'\n'}
                  Secondary Recommendation: Corn{'\n'}
                  Confidence Score: 85%
                </Text>
              </View>
            </Card.Content>
          </Card>
        );
      default:
        return null;
    }
  };

  if (!visible) return null;

  return (
    <Animated.View style={[
      styles.container,
      {
        transform: [{ translateX: slideAnim }]
      }
    ]}>
      <Surface style={styles.content}>
        <ChatHeader currentTab={currentTab} onClose={onClose} />
        {renderAnalysisSummary()}
        <ChatMessages messages={messages} />
        <SuggestionChips 
          suggestions={getSuggestions()} 
          onSelect={handleSuggestionSelect}
        />
        <ChatInput onSend={handleSendMessage} />
      </Surface>
    </Animated.View>
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
