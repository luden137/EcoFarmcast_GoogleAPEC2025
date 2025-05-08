import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BasicInforForm from '../../../components/ui/BasicInforForm';

const BasicInfoScreen = ({ route }) => {
  // Get farmId from route params if editing an existing farm
  const { farmId } = route?.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <BasicInforForm 
        farmId={farmId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default BasicInfoScreen;
