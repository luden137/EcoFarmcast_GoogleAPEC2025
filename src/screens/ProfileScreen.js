import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Surface,
  Text,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  useTheme,
  IconButton
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import useAuth from '../hooks/useAuth';

const ProfileScreen = () => {
  const router = useRouter();
  const theme = useTheme();
  const { currentUser, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Surface style={styles.headerSurface}>
          <View style={styles.profileHeader}>
            <Avatar.Icon 
              size={80} 
              icon="account"
              color={theme.colors.primary}
              style={{ backgroundColor: theme.colors.background }}
            />
            <Text style={styles.userName}>
              {currentUser?.displayName || 'User'}
            </Text>
            <Text style={styles.userEmail}>
              {currentUser?.email || ''}
            </Text>
          </View>
        </Surface>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Data Entry</Title>
            <Paragraph>Update your farm information and record new data.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="contained"
              onPress={() => router.push('/data_entry')}
            >
              Enter Data
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Account Settings</Title>
            <Button 
              mode="outlined" 
              onPress={handleSignOut}
              style={styles.signOutButton}
            >
              Sign Out
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <IconButton
        icon="arrow-left"
        size={24}
        onPress={() => router.back()}
        style={styles.backButton}
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
    padding: 24,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  profileHeader: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    opacity: 0.7,
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  signOutButton: {
    marginTop: 8,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 8,
  },
});

export default ProfileScreen;
