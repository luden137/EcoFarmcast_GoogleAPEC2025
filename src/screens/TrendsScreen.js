import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Text, 
  Surface, 
  useTheme, 
  SegmentedButtons,
  ActivityIndicator
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import useAuth from '../hooks/useAuth';
import { getFarmBasicInfo } from '../services/farmDataService';
import { getMarketTrends, getSoilTrends, getWeatherTrends } from '../services/trendService';
import { USE_DEV_MODE } from '../config/devConfig';
import MarketTrendGraph from '../components/trends/MarketTrendGraph';
import SoilAnalysisGraph from '../components/trends/SoilAnalysisGraph';
import WeatherTrendGraph from '../components/trends/WeatherTrendGraph';
import AIChatSystem from '../components/ai-chat/AIChatSystem';
import AnimatedAIButton from '../components/ai-chat/AnimatedAIButton';

const TrendsScreen = () => {
  const router = useRouter();
  const theme = useTheme();
  const { currentUser } = useAuth();
  const [trendType, setTrendType] = useState('market');
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(!USE_DEV_MODE);
  const [error, setError] = useState(null);
  const [trendsState, setTrendsState] = useState({
    market: { data: null, hasUpdate: false, loading: false },
    soil: { data: null, hasUpdate: false, loading: false },
    weather: { data: null, hasUpdate: false, loading: false }
  });

  useEffect(() => {
    const loadTrendsData = async () => {
      if (USE_DEV_MODE) {
        let mockData;
        switch (trendType) {
          case 'market':
            mockData = await getMarketTrends();
            break;
          case 'soil':
            mockData = await getSoilTrends({ latitude: 0, longitude: 0 });
            break;
          case 'weather':
            mockData = await getWeatherTrends({ latitude: 0, longitude: 0 });
            break;
        }
        setTrendsState(prev => ({
          ...prev,
          [trendType]: {
            data: mockData,
            hasUpdate: true,
            loading: false
          }
        }));
        setLoading(false);
        return;
      }

      if (!currentUser) {
        setError('Please log in to view trends');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
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
        switch (trendType) {
          case 'market':
            data = await getMarketTrends(farm.location.country);
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
        }

        setTrendsState(prev => ({
          ...prev,
          [trendType]: {
            data,
            hasUpdate: true,
            loading: false
          }
        }));
      } catch (error) {
        console.error('Error loading trends data:', error);
        setError('Failed to load trends data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadTrendsData();
  }, [currentUser, trendType]);

  const trendTypes = [
    { value: 'market', label: 'Market' },
    { value: 'soil', label: 'Soil' },
    { value: 'weather', label: 'Weather' }
  ];

  const renderTrendContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading trends data...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    const currentData = trendsState[trendType].data;

    switch (trendType) {
      case 'market':
        return <MarketTrendGraph data={currentData} />;
      case 'soil':
        return <SoilAnalysisGraph data={currentData} />;
      case 'weather':
        return <WeatherTrendGraph data={currentData} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Surface style={styles.headerSurface}>
          <Text style={styles.title}>Trends</Text>
          <Text style={styles.subtitle}>
            Monitor trends and insights for your farm
          </Text>
        </Surface>

        <Surface style={styles.contentSurface}>
          <SegmentedButtons
            value={trendType}
            onValueChange={setTrendType}
            buttons={trendTypes}
            style={styles.segmentedButtons}
          />

          {renderTrendContent()}
        </Surface>
      </ScrollView>

      <AIChatSystem 
        visible={showChat}
        currentTab={trendType}
        analysisState={trendsState}
        onClose={() => setShowChat(false)}
      />

      <AnimatedAIButton
        onPress={() => {
          setShowChat(!showChat);
          if (trendsState[trendType].hasUpdate) {
            setTrendsState(prev => ({
              ...prev,
              [trendType]: {
                ...prev[trendType],
                hasUpdate: false
              }
            }));
          }
        }}
        currentTab={trendType}
        hasUpdates={trendsState[trendType].hasUpdate}
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
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  }
});

export default TrendsScreen;
