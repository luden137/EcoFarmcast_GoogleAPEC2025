import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Text, 
  Button, 
  Surface, 
  useTheme, 
  SegmentedButtons,
  Card,
  Title,
  Paragraph,
  ActivityIndicator
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

const AnalysisScreen = ({ navigation }) => {
  const router = useRouter();
  const theme = useTheme();
  const [analysisType, setAnalysisType] = useState('crops');

  // Placeholder data for different analysis types
  const analysisTypes = [
    { value: 'crops', label: 'Crops' },
    { value: 'carbon', label: 'Carbon' },
    { value: 'energy', label: 'Energy' },
  ];

  const renderAnalysisContent = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    switch (analysisType) {
      case 'crops':
        return (
          <Card style={styles.card}>
            <Card.Content>
              <Title>Crop Recommendations</Title>
              <Paragraph>
                This section will provide AI-powered crop recommendations based on your soil type,
                climate conditions, and farm goals. Enter your farm data to receive personalized
                recommendations.
              </Paragraph>
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>Coming Soon</Text>
                <Icon name="sprout" size={48} color={theme.colors.primary} />
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('DataEntry')}>Enter Farm Data</Button>
            </Card.Actions>
          </Card>
        );
      case 'carbon':
        return (
          <Card style={styles.card}>
            <Card.Content>
              <Title>Carbon Credits</Title>
              <Paragraph>
                Track your carbon footprint and explore opportunities for carbon credits.
                This analysis will help you understand how your farming practices impact
                the environment and how you can monetize sustainable practices.
              </Paragraph>
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>Coming Soon</Text>
                <Icon name="molecule-co2" size={48} color={theme.colors.primary} />
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('DataEntry')}>Enter Farm Data</Button>
            </Card.Actions>
          </Card>
        );
      case 'energy':
        return (
          <Card style={styles.card}>
            <Card.Content>
              <Title>Energy Optimization</Title>
              <Paragraph>
                Analyze your energy usage and discover opportunities for optimization.
                This section will provide recommendations for reducing energy costs
                and improving efficiency on your farm.
              </Paragraph>
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>Coming Soon</Text>
                <Icon name="lightning-bolt" size={48} color={theme.colors.primary} />
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('DataEntry')}>Enter Farm Data</Button>
            </Card.Actions>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Surface style={styles.headerSurface}>
          <Text style={styles.title}>Analysis</Text>
          <Text style={styles.subtitle}>
            Get insights and recommendations for your farm
          </Text>
        </Surface>

        <Surface style={styles.contentSurface}>
          <SegmentedButtons
            value={analysisType}
            onValueChange={setAnalysisType}
            buttons={analysisTypes}
            style={styles.segmentedButtons}
          />

          {renderAnalysisContent()}

          <Button
            mode="contained"
            onPress={() => router.replace("/home")}
            style={styles.button}
          >
            Return to Home
          </Button>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    padding: 16,
  },
  headerSurface: {
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  contentSurface: {
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  placeholderText: {
    fontSize: 18,
    marginBottom: 16,
    opacity: 0.7,
  },
  button: {
    marginTop: 8,
  },
});

export default AnalysisScreen;
