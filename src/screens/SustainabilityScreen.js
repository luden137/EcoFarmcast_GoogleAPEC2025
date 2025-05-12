import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Text, 
  Surface, 
  useTheme, 
  SegmentedButtons,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Button,
  IconButton,
  Divider,
  ProgressBar,
  Checkbox
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import useAuth from '../hooks/useAuth';
import { getSustainabilityData, MOCK_SUSTAINABILITY_DATA } from '../services/sustainabilityService';
import { USE_DEV_MODE } from '../config/devConfig';
import AIChatSystem from '../components/ai-chat/AIChatSystem';
import AnimatedAIButton from '../components/ai-chat/AnimatedAIButton';

const RecommendationCard = ({ title, impact, difficulty, description, checked, onToggle }) => {
  const theme = useTheme();
  
  const getDifficultyColor = (level) => {
    switch(level.toLowerCase()) {
      case 'low': return theme.colors.primary;
      case 'medium': return theme.colors.warning;
      case 'high': return theme.colors.error;
      default: return theme.colors.primary;
    }
  };

  return (
    <Card style={styles.recommendationCard}>
      <Card.Content>
        <View style={styles.recommendationHeader}>
          <Title style={styles.recommendationTitle}>{title}</Title>
          <View style={styles.rightContainer}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(difficulty) }]}>
              <Text style={styles.difficultyText}>{difficulty}</Text>
            </View>
            <Checkbox.Android
              status={checked ? 'checked' : 'unchecked'}
              onPress={onToggle}
              color={theme.colors.primary}
            />
          </View>
        </View>
        <Paragraph style={styles.recommendationDescription}>{description}</Paragraph>
        <View style={styles.impactContainer}>
          <Icon name="leaf" size={20} color={theme.colors.primary} />
          <Text style={styles.impactText}>{impact}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const SustainabilityScreen = () => {
  const router = useRouter();
  const theme = useTheme();
  const { currentUser } = useAuth();
  const [analysisType, setAnalysisType] = useState('actions');
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(!USE_DEV_MODE);
  const [error, setError] = useState(null);
  const [sustainabilityData, setSustainabilityData] = useState(USE_DEV_MODE ? MOCK_SUSTAINABILITY_DATA : null);
  const [checkedRecommendations, setCheckedRecommendations] = useState({});

  const toggleRecommendation = (index) => {
    setCheckedRecommendations(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => {
    const loadSustainabilityData = async () => {
      if (!USE_DEV_MODE) {
        if (!currentUser) {
          setError('Please log in to view sustainability data');
          setLoading(false);
          return;
        }

        try {
          setLoading(true);
          setError(null);
          const data = await getSustainabilityData(currentUser.uid);
          setSustainabilityData(data);
        } catch (error) {
          console.error('Error loading sustainability data:', error);
          setError('Failed to load sustainability data. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    loadSustainabilityData();
  }, [currentUser, USE_DEV_MODE]);

  const analysisTypes = [
    { value: 'actions', label: 'Action Items' },
    { value: 'analysis', label: 'Impact Analysis' }
  ];

  const renderActionItems = () => {
    if (!sustainabilityData?.actionItems) return null;

    const { carbonCredits, recommendations } = sustainabilityData.actionItems;
    
    return (
      <View>
        <Card style={styles.creditCard}>
          <Card.Content>
            <View style={styles.cardHeaderContainer}>
              <View style={styles.creditHeader}>
                <Icon name="leaf" size={40} color={theme.colors.primary} />
                <Title style={styles.creditTitle}>Carbon Credits</Title>
              </View>
              <View style={styles.chatButtonContainer}>
                <IconButton
                  icon="robot"
                  size={28}
                  onPress={() => setShowChat(true)}
                  style={[styles.chatButton, { backgroundColor: theme.colors.primary }]}
                  iconColor="white"
                />
                <Text style={styles.chatLabel}>AI Help</Text>
              </View>
            </View>
            <View style={styles.creditStats}>
              <View style={styles.creditStat}>
                <Text style={styles.creditLabel}>Current</Text>
                <Text style={styles.creditValue}>{carbonCredits.current}</Text>
                <Text style={styles.creditUnit}>{carbonCredits.unit}</Text>
              </View>
              <View style={styles.creditStat}>
                <Text style={styles.creditLabel}>Potential</Text>
                <Text style={styles.creditValue}>{carbonCredits.potential}</Text>
                <Text style={styles.creditUnit}>{carbonCredits.unit}</Text>
              </View>
            </View>
            <ProgressBar 
              progress={carbonCredits.current / carbonCredits.potential} 
              color={theme.colors.primary}
              style={styles.progressBar}
            />
          </Card.Content>
        </Card>

        <Title style={styles.sectionTitle}>Recommended Actions</Title>
        {recommendations.map((rec, index) => (
          <RecommendationCard 
            key={index} 
            {...rec} 
            checked={checkedRecommendations[index]}
            onToggle={() => toggleRecommendation(index)}
          />
        ))}
      </View>
    );
  };

  const renderAnalysis = () => {
    if (!sustainabilityData?.analysis) return null;

    const { carbonFootprint, soilHealth } = sustainabilityData.analysis;
    
    return (
      <View>
        <Card style={styles.analysisCard}>
          <Card.Content>
            <View style={styles.cardHeaderContainer}>
              <Title style={styles.analysisTitle}>Carbon Footprint</Title>
              <View style={styles.chatButtonContainer}>
                <IconButton
                  icon="robot"
                  size={28}
                  onPress={() => setShowChat(true)}
                  style={[styles.chatButton, { backgroundColor: theme.colors.primary }]}
                  iconColor="white"
                />
                <Text style={styles.chatLabel}>AI Help</Text>
              </View>
            </View>
            <View style={styles.footprintStats}>
              <View style={styles.footprintStat}>
                <Text style={styles.statLabel}>Current Year</Text>
                <Text style={styles.statValue}>{carbonFootprint.current}</Text>
                <Text style={styles.statUnit}>{carbonFootprint.unit}</Text>
              </View>
              <Icon name="arrow-right" size={24} color={theme.colors.primary} />
              <View style={styles.footprintStat}>
                <Text style={styles.statLabel}>Previous Year</Text>
                <Text style={styles.statValue}>{carbonFootprint.previousYear}</Text>
                <Text style={styles.statUnit}>{carbonFootprint.unit}</Text>
              </View>
            </View>
            
            <Title style={styles.breakdownTitle}>Breakdown</Title>
            <View style={styles.breakdownContainer}>
              {Object.entries(carbonFootprint.breakdown).map(([key, value]) => (
                <View key={key} style={styles.breakdownItem}>
                  <Text style={styles.breakdownLabel}>{key}</Text>
                  <Text style={styles.breakdownValue}>{value} {carbonFootprint.unit}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.analysisCard, styles.soilCard]}>
          <Card.Content>
            <View style={styles.cardHeaderContainer}>
              <Title style={styles.analysisTitle}>Soil Health</Title>
              <View style={styles.chatButtonContainer}>
                <IconButton
                  icon="robot"
                  size={28}
                  onPress={() => setShowChat(true)}
                  style={[styles.chatButton, { backgroundColor: theme.colors.primary }]}
                  iconColor="white"
                />
                <Text style={styles.chatLabel}>AI Help</Text>
              </View>
            </View>
            <View style={styles.soilStats}>
              <View style={styles.soilStat}>
                <Text style={styles.soilLabel}>Organic Matter</Text>
                <Text style={styles.soilValue}>{soilHealth.organicMatter}</Text>
              </View>
              <View style={styles.soilStat}>
                <Text style={styles.soilLabel}>Carbon Sequestration</Text>
                <Text style={styles.soilValue}>{soilHealth.carbonSequestration}</Text>
              </View>
              <View style={styles.soilStat}>
                <Text style={styles.soilLabel}>Soil Quality</Text>
                <Text style={styles.soilValue}>{soilHealth.soilQuality}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading sustainability data...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Icon name="alert-circle-outline" size={48} color={theme.colors.error} />
          <Text style={styles.errorText}>{error}</Text>
          <Button 
            mode="contained" 
            onPress={() => router.push('/data_entry')}
            style={styles.errorButton}
          >
            Add Farm Data
          </Button>
        </View>
      );
    }

    return analysisType === 'actions' ? renderActionItems() : renderAnalysis();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Surface style={styles.headerSurface}>
          <View style={styles.headerContent}>
            <IconButton
              icon="arrow-left"
              size={24}
              onPress={() => router.push('/home')}
              style={styles.backButton}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Green Impact</Text>
              <Text style={styles.subtitle}>
                Track and improve your environmental impact
              </Text>
            </View>
          </View>
        </Surface>

        <Surface style={styles.contentSurface}>
          <SegmentedButtons
            value={analysisType}
            onValueChange={setAnalysisType}
            buttons={analysisTypes}
            style={styles.segmentedButtons}
          />

          {renderContent()}
        </Surface>
      </ScrollView>

      <AIChatSystem 
        visible={showChat}
        currentTab={analysisType}
        analysisState={sustainabilityData}
        onClose={() => setShowChat(false)}
      />

      <AnimatedAIButton
        onPress={() => setShowChat(!showChat)}
        currentTab={analysisType}
        hasUpdates={false}
      />
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    margin: -8,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
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
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  loadingContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    opacity: 0.7,
  },
  errorContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    marginTop: 16,
    marginBottom: 24,
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  errorButton: {
    minWidth: 200,
  },
  creditCard: {
    marginBottom: 16,
  },
  creditHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  creditTitle: {
    fontSize: 24,
    marginLeft: 12,
  },
  creditStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  creditStat: {
    alignItems: 'center',
  },
  creditLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  creditValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  creditUnit: {
    fontSize: 12,
    opacity: 0.7,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  recommendationCard: {
    marginBottom: 12,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recommendationTitle: {
    fontSize: 18,
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: 'white',
    fontSize: 12,
  },
  recommendationDescription: {
    marginBottom: 8,
  },
  impactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  impactText: {
    marginLeft: 8,
    color: '#2e7d32',
  },
  analysisCard: {
    marginBottom: 16,
  },
  analysisTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  footprintStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 24,
  },
  footprintStat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statUnit: {
    fontSize: 12,
    opacity: 0.7,
  },
  breakdownTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  breakdownContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  breakdownLabel: {
    textTransform: 'capitalize',
    opacity: 0.7,
  },
  breakdownValue: {
    fontWeight: 'bold',
  },
  soilCard: {
    marginTop: 8,
  },
  soilStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  soilStat: {
    alignItems: 'center',
    flex: 1,
  },
  soilLabel: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 4,
  },
  soilValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chatButtonContainer: {
    alignItems: 'center',
  },
  chatButton: {
    margin: -8,
    borderRadius: 12,
  },
  chatLabel: {
    fontSize: 12,
    marginTop: -4,
    opacity: 0.7,
  },
});

export default SustainabilityScreen;
