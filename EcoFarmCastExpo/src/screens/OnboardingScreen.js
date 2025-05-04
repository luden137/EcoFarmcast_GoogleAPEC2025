import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Surface, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const OnboardingScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Surface style={styles.surface}>
          <Text style={styles.title}>Farm Setup</Text>
          <Text style={styles.subtitle}>
            Complete your farm profile to get personalized recommendations
          </Text>
          
          <Text style={styles.sectionTitle}>Coming Soon</Text>
          <Text style={styles.description}>
            The farm setup process is under development. This screen will allow you to:
          </Text>
          
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>- Enter basic farm information</Text>
            <Text style={styles.bulletPoint}>- Specify soil and climate conditions</Text>
            <Text style={styles.bulletPoint}>- Add your crops and farming practices</Text>
            <Text style={styles.bulletPoint}>- List your equipment and resources</Text>
            <Text style={styles.bulletPoint}>- Set your sustainability goals</Text>
          </View>
          
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Home')}
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
  surface: {
    padding: 24,
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
    marginBottom: 24,
    opacity: 0.7,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  bulletPoints: {
    marginBottom: 24,
  },
  bulletPoint: {
    fontSize: 14,
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
  },
});

export default OnboardingScreen;
