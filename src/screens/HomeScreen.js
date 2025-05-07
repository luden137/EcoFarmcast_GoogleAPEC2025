import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {
  Surface,
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  useTheme,
  Avatar
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'expo-router';

const FeatureCard = ({ title, description, icon, buttonText, onPress }) => {
  const theme = useTheme();
  
  return (
    <Card
      style={styles.card}
      onPress={onPress}
    >
      <Card.Content>
        <View style={styles.cardHeader}>
          <Avatar.Icon
            size={40}
            icon={icon}
            color={theme.colors.primary}
            style={{ backgroundColor: theme.colors.background }}
          />
          <Title style={styles.cardTitle}>{title}</Title>
        </View>
        <Paragraph style={styles.cardDescription}>{description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={onPress}>{buttonText}</Button>
      </Card.Actions>
    </Card>
  );
};

export const HomeScreen = ({ navigation }) => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const theme = useTheme();
  
  const features = [
    {
      title: 'Data Entry',
      description: 'Record and manage your farm data including soil conditions, crop details, and equipment usage.',
      icon: 'clipboard-text',
      buttonText: 'Enter Data',
      onPress: () => router.replace("/data_entry")
    },
    {
      title: 'Analysis',
      description: 'Get insights and recommendations based on your farm data and environmental conditions.',
      icon: 'chart-bar',
      buttonText: 'View Analysis',
      onPress: () => router.replace("/analysis")
    },
    {
      title: 'Sustainability',
      description: 'Track your environmental impact and explore opportunities for carbon credits.',
      icon: 'leaf',
      buttonText: 'Check Impact',
      onPress: () => router.replace("/analysis")
    },
    {
      title: 'Trends',
      description: 'Monitor agricultural trends and market conditions affecting your farm.',
      icon: 'trending-up',
      buttonText: 'View Trends',
      onPress: () => router.replace("/analysis")
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Welcome Section */}
        <Surface style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            Welcome to EcoFarmCast, {currentUser?.displayName || 'Farmer'}!
          </Text>
          <Text style={styles.welcomeSubtitle}>
            Your smart farming companion for sustainable agriculture
          </Text>
        </Surface>

        {/* Features Grid */}
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              buttonText={feature.buttonText}
              onPress={feature.onPress}
            />
          ))}
        </View>

        {/* Quick Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Farm Overview</Text>
          
          <Surface style={styles.statCard}>
            <Text style={styles.statCardTitle}>Recent Activity</Text>
            <Text style={styles.statCardContent}>
              No recent activity to display. Start by entering your farm data.
            </Text>
            <Button
              mode="outlined"
              onPress={() =>  router.replace("/data_entry")}
              style={styles.statCardButton}
            >
              Enter Data
            </Button>
          </Surface>
          
          <Surface style={styles.statCard}>
            <Text style={styles.statCardTitle}>Recommendations</Text>
            <Text style={styles.statCardContent}>
              Complete your farm profile to receive personalized recommendations.
            </Text>
            <Button
              mode="outlined"
              onPress={() =>  router.replace("/onboarding")}
              style={styles.statCardButton}
            >
              Complete Profile
            </Button>
          </Surface>
        </View>
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
  welcomeSection: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    elevation: 2,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: '48%',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    marginLeft: 8,
  },
  cardDescription: {
    fontSize: 14,
  },
  statsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  statCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statCardContent: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.7,
  },
  statCardButton: {
    alignSelf: 'flex-start',
  },
});

export default HomeScreen;
