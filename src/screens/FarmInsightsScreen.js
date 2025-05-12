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
  Divider
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import useAuth from '../hooks/useAuth';
import { getFarmBasicInfo } from '../services/farmDataService';
import { getCropRecommendations } from '../services/analysisService';
import { 
  getMarketTrends, 
  getSoilTrends, 
  getWeatherTrends,
  MOCK_MARKET_TRENDS,
  MOCK_SOIL_TRENDS,
  MOCK_WEATHER_TRENDS
} from '../services/trendService';
import { USE_DEV_MODE } from '../config/devConfig';
import AIChatSystem from '../components/ai-chat/AIChatSystem';
import AnimatedAIButton from '../components/ai-chat/AnimatedAIButton';
import MarketTrendGraph from '../components/trends/MarketTrendGraph';
import SoilAnalysisGraph from '../components/trends/SoilAnalysisGraph';
import WeatherTrendGraph from '../components/trends/WeatherTrendGraph';

// Mock data for development
const MOCK_RECOMMENDATIONS = {
  crops: {
    primaryCrop: 'Wheat',
    secondaryCrop: 'Corn',
    waterNeeds: 'Medium',
    climateMatch: '85%',
    soilType: 'Loamy',
    growingSeason: 'Spring-Fall',
    lastUpdate: new Date().toLocaleString(),
    description: 'Based on your farm\'s conditions, wheat is recommended as your primary crop with corn as a complementary crop. Your soil and climate conditions are well-suited for these selections.'
  }
};

const FarmInsightsScreen = () => {
  const router = useRouter();
  const theme = useTheme();
  const { currentUser } = useAuth();
  const [analysisType, setAnalysisType] = useState('crops');
  const [showChat, setShowChat] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [loading, setLoading] = useState(!USE_DEV_MODE);
  const [error, setError] = useState(null);
  const [insightsData, setInsightsData] = useState({
    crops: { data: USE_DEV_MODE ? MOCK_RECOMMENDATIONS.crops : null, hasUpdate: false },
    soil: { data: USE_DEV_MODE ? MOCK_SOIL_TRENDS : null, hasUpdate: false },
    weather: { data: USE_DEV_MODE ? MOCK_WEATHER_TRENDS : null, hasUpdate: false },
    market: { data: USE_DEV_MODE ? MOCK_MARKET_TRENDS : null, hasUpdate: false }
  });

  useEffect(() => {
    const loadInsightsData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (USE_DEV_MODE) {
          let data;
          switch (analysisType) {
            case 'crops':
              data = MOCK_RECOMMENDATIONS.crops;
              break;
            case 'soil':
              data = MOCK_SOIL_TRENDS;
              break;
            case 'weather':
              data = MOCK_WEATHER_TRENDS;
              break;
            case 'market':
              data = MOCK_MARKET_TRENDS;
              break;
          }
          setInsightsData(prev => ({
            ...prev,
            [analysisType]: {
              data,
              hasUpdate: true
            }
          }));
          setLoading(false);
          return;
        }

        if (!currentUser) {
          setError('Please log in to view insights');
          setLoading(false);
          return;
        }
        
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

        let data;
        switch (analysisType) {
          case 'crops':
            data = await getCropRecommendations({
              latitude: farm.location.coordinates.latitude,
              longitude: farm.location.coordinates.longitude,
              country: farm.location.country
            });
            break;
          case 'soil':
            data = await getSoilTrends({
              latitude: farm.location.coordinates.latitude,
              longitude: farm.location.coordinates.longitude
            });
            break;
          case 'weather':
            data = await getWeatherTrends({
              latitude: farm.location.coordinates.latitude,
              longitude: farm.location.coordinates.longitude
            });
            break;
          case 'market':
            data = await getMarketTrends(farm.location.country);
            break;
        }

        setInsightsData(prev => ({
          ...prev,
          [analysisType]: {
            data,
            hasUpdate: true
          }
        }));
      } catch (error) {
        console.error('Error loading insights data:', error);
        setError('Failed to load insights data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadInsightsData();
  }, [currentUser, analysisType]);

  const analysisTypes = [
    { value: 'crops', label: 'Crops' },
    { value: 'soil', label: 'Soil' },
    { value: 'weather', label: 'Weather' },
    { value: 'market', label: 'Market' }
  ];

  const renderCropInsights = () => {
    const cropData = insightsData.crops.data;
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

          <View style={styles.trendInfo}>
            <Text style={styles.updateTime}>
              Last updated: {cropData.lastUpdate || 'N/A'}
            </Text>
            <Text style={styles.trendDescription}>
              {cropData.description || 
               'Based on your farm\'s conditions, these crops are recommended for optimal yield and sustainability.'}
            </Text>
          </View>

          <View style={styles.reportSection}>
            <Button 
              mode="contained"
              onPress={() => {
                setIsGeneratingReport(true);
                setTimeout(() => {
                  setIsGeneratingReport(false);
                  setReportGenerated(true);
                  setShowChat(true);
                }, 2000);
              }}
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
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading insights data...</Text>
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
        return renderCropInsights();
      case 'soil':
        return (
          <Card style={styles.card}>
            <Card.Content>
              <SoilAnalysisGraph data={insightsData.soil.data} />
              <View style={styles.trendInfo}>
                <Text style={styles.updateTime}>
                  Last updated: {insightsData.soil.data?.lastUpdate || 'N/A'}
                </Text>
                <Text style={styles.trendDescription}>
                  {insightsData.soil.data?.description || 
                   'Your soil analysis shows key nutrients and pH levels. Higher quality index indicates better soil health for crop growth.'}
                </Text>
              </View>

              <View style={styles.reportSection}>
                <Button 
                  mode="contained"
                  onPress={() => {
                    setIsGeneratingReport(true);
                    setTimeout(() => {
                      setIsGeneratingReport(false);
                      setReportGenerated(true);
                      setShowChat(true);
                    }, 2000);
                  }}
                  icon="chat"
                  style={styles.reportButton}
                  contentStyle={styles.reportButtonContent}
                  labelStyle={styles.reportButtonLabel}
                >
                  Chat with AI Assistant
                </Button>
              </View>
            </Card.Content>
          </Card>
        );
      case 'weather':
        return (
          <Card style={styles.card}>
            <Card.Content>
              <WeatherTrendGraph data={insightsData.weather.data} />
              <View style={styles.trendInfo}>
                <Text style={styles.updateTime}>
                  Last updated: {insightsData.weather.data?.lastUpdate || 'N/A'}
                </Text>
                <Text style={styles.trendDescription}>
                  {insightsData.weather.data?.description || 
                   'Current weather conditions affecting your farm. Temperature, humidity, and wind speed are key factors for crop management.'}
                </Text>
              </View>

              <View style={styles.reportSection}>
                <Button 
                  mode="contained"
                  onPress={() => {
                    setIsGeneratingReport(true);
                    setTimeout(() => {
                      setIsGeneratingReport(false);
                      setReportGenerated(true);
                      setShowChat(true);
                    }, 2000);
                  }}
                  icon="chat"
                  style={styles.reportButton}
                  contentStyle={styles.reportButtonContent}
                  labelStyle={styles.reportButtonLabel}
                >
                  Chat with AI Assistant
                </Button>
              </View>
            </Card.Content>
          </Card>
        );
      case 'market':
        return (
          <Card style={styles.card}>
            <Card.Content>
              <MarketTrendGraph data={insightsData.market.data} />
              <View style={styles.trendInfo}>
                <Text style={styles.updateTime}>
                  Last updated: {insightsData.market.data?.lastUpdate || 'N/A'}
                </Text>
                <Text style={styles.trendDescription}>
                  {insightsData.market.data?.description || 
                   'Current market prices for various crops. Track price changes to optimize your crop selection and timing.'}
                </Text>
              </View>

              <View style={styles.reportSection}>
                <Button 
                  mode="contained"
                  onPress={() => {
                    setIsGeneratingReport(true);
                    setTimeout(() => {
                      setIsGeneratingReport(false);
                      setReportGenerated(true);
                      setShowChat(true);
                    }, 2000);
                  }}
                  icon="chat"
                  style={styles.reportButton}
                  contentStyle={styles.reportButtonContent}
                  labelStyle={styles.reportButtonLabel}
                >
                  Chat with AI Assistant
                </Button>
              </View>
            </Card.Content>
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
          <View style={styles.headerRow}>
            <IconButton
              icon="arrow-left"
              size={24}
              onPress={() => router.replace("/home")}
            />
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Farm Insights</Text>
              <Text style={styles.subtitle}>
                Get comprehensive insights about your farm
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
        analysisState={insightsData}
        onClose={() => setShowChat(false)}
      />

      <AnimatedAIButton
        onPress={() => {
          setShowChat(!showChat);
          if (insightsData[analysisType].hasUpdate) {
            setInsightsData(prev => ({
              ...prev,
              [analysisType]: {
                ...prev[analysisType],
                hasUpdate: false
              }
            }));
          }
        }}
        currentTab={analysisType}
        hasUpdates={insightsData[analysisType].hasUpdate}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
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
  divider: {
    marginVertical: 16,
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
  trendInfo: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  updateTime: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 8,
  },
  trendDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default FarmInsightsScreen;
