import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Text, 
  Button, 
  Surface, 
  useTheme, 
  SegmentedButtons,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  IconButton,
  Divider,
  Portal,
  Dialog
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import useAuth from '../hooks/useAuth';
import { getFarmBasicInfo } from '../services/farmDataService';
import { getCropRecommendations } from '../services/analysisService';
import { USE_DEV_MODE } from '../config/devConfig';
import AIChatSystem from '../components/ai-chat/AIChatSystem';
import AnimatedAIButton from '../components/ai-chat/AnimatedAIButton';

// Mock data for development
const MOCK_RECOMMENDATIONS = {
  crops: {
    primaryCrop: 'Wheat',
    secondaryCrop: 'Corn',
    waterNeeds: 'Medium',
    climateMatch: '85%',
    soilType: 'Loamy',
    growingSeason: 'Spring-Fall'
  }
};

const AnalysisScreen = () => {
  const router = useRouter();
  const theme = useTheme();
  const { currentUser } = useAuth();
  const [analysisType, setAnalysisType] = useState('crops');
  const [showChat, setShowChat] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [loading, setLoading] = useState(!USE_DEV_MODE);
  const [error, setError] = useState(null);
  const [analysisState, setAnalysisState] = useState({
    crops: { result: USE_DEV_MODE ? MOCK_RECOMMENDATIONS.crops : null, hasUpdate: false, loading: false },
    carbon: { result: null, hasUpdate: false, loading: false }
  });

  // Load farm data and get recommendations when component mounts or analysis type changes
  useEffect(() => {
    if (USE_DEV_MODE) {
      return;
    }

    const loadAnalysisData = async () => {
      if (!currentUser) {
        setError('Please log in to view analysis');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Get the first farm for now (we can add farm selection later)
        const farms = await getFarmBasicInfo(currentUser.uid);
        if (!farms || farms.length === 0) {
          setError('No farm data found. Please add farm information first.');
          setLoading(false);
          return;
        }

        const farm = farms[0];
        if (!farm.location?.coordinates?.latitude || !farm.location?.coordinates?.longitude) {
          setError('Farm location data is incomplete. Please update farm information.');
          setLoading(false);
          return;
        }

        // Get recommendations based on farm data
        const recommendations = await getCropRecommendations({
          latitude: farm.location.coordinates.latitude,
          longitude: farm.location.coordinates.longitude,
          country: farm.location.country
        });

        setAnalysisState(prev => ({
          ...prev,
          [analysisType]: {
            result: recommendations,
            hasUpdate: true,
            loading: false
          }
        }));
      } catch (error) {
        console.error('Error loading analysis data:', error);
        setError('Failed to load analysis data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadAnalysisData();
  }, [currentUser, analysisType]);

  // Cleanup report when leaving the page
  useEffect(() => {
    return () => {
      if (reportGenerated) {
        // Here we would delete the temporary report
        setReportGenerated(false);
      }
    };
  }, [reportGenerated]);

  const handleGenerateReport = () => {
    if (!reportGenerated) {
      setIsGeneratingReport(true);
      // Simulate report generation
      setTimeout(() => {
        setIsGeneratingReport(false);
        setReportGenerated(true);
        setShowChat(true);
      }, 2000);
    }
  };

  const analysisTypes = [
    { value: 'crops', label: 'Crops' },
    { value: 'carbon', label: 'Carbon' }
  ];

  const renderAnalysisContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading analysis data...</Text>
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

    switch (analysisType) {
      case 'crops':
        const cropData = analysisState.crops.result;
        if (!cropData) return null;
        return (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.recommendationHeader}>
                <Icon name="sprout" size={40} color={theme.colors.primary} />
                <Title style={styles.recommendationTitle}>Recommended Crops</Title>
              </View>
              
              <View style={styles.mainRecommendation}>
                <View style={styles.cropItem}>
                  <Icon name="grain" size={48} color={theme.colors.primary} />
                  <Text style={styles.cropName}>{cropData.primaryCrop}</Text>
                  <Text style={styles.cropLabel}>Primary Crop</Text>
                </View>
                <View style={styles.cropDivider} />
                <View style={styles.cropItem}>
                  <Icon name="corn" size={48} color={theme.colors.secondary} />
                  <Text style={styles.cropName}>{cropData.secondaryCrop}</Text>
                  <Text style={styles.cropLabel}>Secondary Crop</Text>
                </View>
              </View>

              <Divider style={styles.divider} />
              
              <View style={styles.analysisContainer}>
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Icon name="water" size={32} color={theme.colors.primary} />
                    <Text style={styles.statLabel}>Water Needs</Text>
                    <Text style={styles.statValue}>{cropData.waterNeeds}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Icon name="sun-thermometer" size={32} color={theme.colors.primary} />
                    <Text style={styles.statLabel}>Climate Match</Text>
                    <Text style={styles.statValue}>{cropData.climateMatch}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Icon name="shovel" size={32} color={theme.colors.primary} />
                    <Text style={styles.statLabel}>Soil Type</Text>
                    <Text style={styles.statValue}>{cropData.soilType}</Text>
                  </View>
                </View>

                <View style={styles.reportSection}>
                  <Button 
                    mode="contained"
                    onPress={handleGenerateReport}
                    icon={isGeneratingReport ? "loading" : reportGenerated ? "file-download" : "file-document-outline"}
                    style={styles.reportButton}
                    contentStyle={styles.reportButtonContent}
                    labelStyle={styles.reportButtonLabel}
                    loading={isGeneratingReport}
                    disabled={isGeneratingReport}
                  >
                    {reportGenerated ? "Save & Share Report" : "Generate Detailed Report"}
                  </Button>
                </View>
              </View>

              <Button 
                mode="outlined" 
                onPress={() => router.push('/data_entry')}
                style={styles.updateButton}
              >
                Update Farm Data
              </Button>
            </Card.Content>
          </Card>
        );
      // ... other cases remain the same
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

      <AIChatSystem 
        visible={showChat}
        currentTab={analysisType}
        analysisState={analysisState}
        onClose={() => setShowChat(false)}
      />

      <AnimatedAIButton
        onPress={() => {
          if (showChat) {
            setShowChat(false);
          } else {
            if (!reportGenerated) {
              setIsGeneratingReport(true);
              setTimeout(() => {
                setIsGeneratingReport(false);
                setReportGenerated(true);
                setShowChat(true);
              }, 2000);
            } else {
              setShowChat(true);
            }
          }
          if (analysisState[analysisType].hasUpdate) {
            setAnalysisState(prev => ({
              ...prev,
              [analysisType]: {
                ...prev[analysisType],
                hasUpdate: false
              }
            }));
          }
        }}
        currentTab={analysisType}
        hasUpdates={analysisState[analysisType].hasUpdate}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  recommendationTitle: {
    fontSize: 24,
    marginLeft: 12,
    color: '#2e7d32',
  },
  mainRecommendation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cropItem: {
    alignItems: 'center',
    flex: 1,
  },
  cropName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#2e7d32',
  },
  cropLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  cropDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  analysisContainer: {
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
    opacity: 0.7,
  },
  statValue: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 16,
  },
  reportSection: {
    marginTop: 24,
  },
  reportButton: {
    height: 56,
  },
  reportButtonContent: {
    height: 56,
  },
  reportButtonLabel: {
    fontSize: 16,
  },
  updateButton: {
    marginTop: 16,
  },
  button: {
    marginTop: 8,
  },
});

export default AnalysisScreen;
