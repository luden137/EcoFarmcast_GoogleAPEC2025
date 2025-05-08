import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Surface, useTheme, List, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

const DataEntryScreen = ({ navigation }) => {
  const router = useRouter();
  const theme = useTheme();

  const dataCategories = [
    {
      title: 'Basic Information',
      icon: 'information-outline',
      description: 'Farm name, location, size, etc.',
    },
    {
      title: 'Soil & Climate',
      icon: 'terrain',
      description: 'Soil type, pH, rainfall, temperature, etc.',
    },
    {
      title: 'Crops',
      icon: 'sprout',
      description: 'Current and planned crops, rotations, etc.',
    },
    {
      title: 'Equipment',
      icon: 'tractor',
      description: 'Machinery, irrigation systems, etc.',
    },
    {
      title: 'Fertilizers & Inputs',
      icon: 'bottle-tonic',
      description: 'Fertilizers, pesticides, amendments, etc.',
    },
    {
      title: 'Practices',
      icon: 'hand-heart',
      description: 'Sustainable practices, certifications, etc.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Surface style={styles.headerSurface}>
          <Text style={styles.title}>Data Entry</Text>
          <Text style={styles.subtitle}>
            Enter your farm data to get personalized recommendations
          </Text>
        </Surface>

        <Surface style={styles.categoriesSurface}>
          <Text style={styles.sectionTitle}>Farm Data Categories</Text>
          <Text style={styles.description}>
            Select a category to enter or update your farm data:
          </Text>
          
          <List.Section>
            {dataCategories.map((category, index) => (
              <React.Fragment key={index}>
                <List.Item
                  title={category.title}
                  description={category.description}
                  left={props => <List.Icon {...props} icon={category.icon} />}
                  right={props => <List.Icon {...props} icon="chevron-right" />}
                  onPress={() => {
                    // Navigate to the appropriate form screen based on the category
                    if (category.title === 'Basic Information') {
                      router.push('/basic_info');
                    } else {
                      // For other categories, show a "coming soon" message
                      Alert.alert(
                        'Coming Soon',
                        `The ${category.title} form is under development.`
                      );
                    }
                  }}
                  style={styles.listItem}
                />
                {index < dataCategories.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List.Section>
          
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
  categoriesSurface: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  listItem: {
    paddingVertical: 8,
  },
  button: {
    marginTop: 16,
  },
});

export default DataEntryScreen;
