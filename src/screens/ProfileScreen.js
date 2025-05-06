import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Text, 
  Button, 
  Surface, 
  useTheme, 
  Avatar,
  List,
  Divider,
  IconButton
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../hooks/useAuth';

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Navigation will be handled by the AppNavigator based on auth state
    } catch (error) {
      Alert.alert('Logout Error', 'Failed to log out. Please try again.');
    }
  };

  const profileSections = [
    {
      title: 'Account Settings',
      items: [
        { title: 'Edit Profile', icon: 'account-edit', onPress: () => {} },
        { title: 'Change Password', icon: 'lock-reset', onPress: () => {} },
        { title: 'Notification Preferences', icon: 'bell-outline', onPress: () => {} },
      ]
    },
    {
      title: 'Farm Management',
      items: [
        { title: 'Manage Farms', icon: 'home-outline', onPress: () => {} },
        { title: 'Data Backup', icon: 'cloud-upload-outline', onPress: () => {} },
        { title: 'Export Data', icon: 'export', onPress: () => {} },
      ]
    },
    {
      title: 'Support',
      items: [
        { title: 'Help Center', icon: 'help-circle-outline', onPress: () => {} },
        { title: 'Contact Support', icon: 'message-text-outline', onPress: () => {} },
        { title: 'Privacy Policy', icon: 'shield-account-outline', onPress: () => {} },
        { title: 'Terms of Service', icon: 'file-document-outline', onPress: () => {} },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Surface style={styles.profileSurface}>
          <View style={styles.profileHeader}>
            <Avatar.Icon 
              size={80} 
              icon="account" 
              style={styles.avatar}
              color={theme.colors.primary}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{currentUser?.displayName || 'User'}</Text>
              <Text style={styles.email}>{currentUser?.email || 'user@example.com'}</Text>
              <Text style={styles.comingSoon}>Profile customization coming soon</Text>
            </View>
          </View>
        </Surface>

        {profileSections.map((section, sectionIndex) => (
          <Surface key={sectionIndex} style={styles.sectionSurface}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <List.Section>
              {section.items.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  <List.Item
                    title={item.title}
                    left={props => <List.Icon {...props} icon={item.icon} />}
                    right={props => <List.Icon {...props} icon="chevron-right" />}
                    onPress={item.onPress}
                    style={styles.listItem}
                  />
                  {itemIndex < section.items.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List.Section>
          </Surface>
        ))}

        <Button
          mode="outlined"
          icon="logout"
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          Log Out
        </Button>
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
  profileSurface: {
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#E8F5E9',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  comingSoon: {
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.5,
  },
  sectionSurface: {
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  listItem: {
    paddingVertical: 8,
  },
  logoutButton: {
    marginBottom: 24,
  },
});

export default ProfileScreen;
