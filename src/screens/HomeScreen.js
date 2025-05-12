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
      title: 'Farm Insights',
      description: 'Get comprehensive insights about your farm including soil, weather, market trends, and crop recommendations.',
      icon: 'chart-box',
      buttonText: 'View Insights',
      onPress: () => router.replace("/farm_insights")
    },
    {
      title: 'Green Impact',
      description: 'Track your environmental impact and explore sustainable farming opportunities.',
      icon: 'leaf',
      buttonText: 'View Impact',
      onPress: () => router.replace("/sustainability")
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Header Section */}
        <Surface style={styles.welcomeSection}>
          <View style={styles.headerRow}>
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeTitle}>
                Welcome, {currentUser?.displayName || 'Farmer'}!
              </Text>
              <Text style={styles.welcomeSubtitle}>
                Your smart farming companion
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.avatarButton}
              onPress={() => router.replace("/profile")}
            >
              <Avatar.Icon 
                size={48} 
                icon="account"
                color={theme.colors.primary}
                style={{ backgroundColor: theme.colors.background }}
              />
            </TouchableOpacity>
          </View>
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

        {/* Onboarding Guide Card */}
        <Card style={styles.onboardingCard}>
          <Card.Content>
            <View style={styles.onboardingHeader}>
              <Icon name="lightbulb-outline" size={32} color={theme.colors.primary} />
              <Title style={styles.onboardingTitle}>New to EcoFarmCast?</Title>
            </View>
            <Paragraph style={styles.onboardingText}>
              Let us guide you through setting up your farm profile and getting the most out of our features.
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="contained"
              onPress={() => router.replace("/onboarding")}
            >
              Start Guide
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeTextContainer: {
    flex: 1,
  },
  avatarButton: {
    marginLeft: 16,
  },
  onboardingCard: {
    marginBottom: 24,
  },
  onboardingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  onboardingTitle: {
    marginLeft: 12,
    fontSize: 20,
  },
  onboardingText: {
    fontSize: 14,
    opacity: 0.7,
  },
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
