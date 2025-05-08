import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button, Surface, useTheme, ActivityIndicator, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import useAuth from '../../src/hooks/useAuth';
import { saveFarmBasicInfo, updateFarmBasicInfo, getFarmBasicInfo } from '../../src/services/farmDataService';
import FormInputField from './FormInputField';
import FormSelectField from './FormSelectField';

interface BasicInfoFormProps {
  farmId?: string; // Optional farmId for editing existing farm
  onSuccess?: () => void; // Optional callback for when form is successfully submitted
}

const BasicInforForm: React.FC<BasicInfoFormProps> = ({ farmId, onSuccess }) => {
  const theme = useTheme();
  const router = useRouter();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [formData, setFormData] = useState({
    farmName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    latitude: '',
    longitude: '',
    sizeValue: '',
    sizeUnit: 'hectares',
    farmType: [] as string[],
    yearEstablished: '',
    description: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Farm type options
  const farmTypeOptions = [
    { label: 'Crop Farming', value: 'crop' },
    { label: 'Livestock', value: 'livestock' },
    { label: 'Mixed Farming', value: 'mixed' },
    { label: 'Organic Farming', value: 'organic' },
    { label: 'Plantation', value: 'plantation' },
    { label: 'Subsistence Farming', value: 'subsistence' },
    { label: 'Commercial Farming', value: 'commercial' },
    { label: 'Other', value: 'other' }
  ];

  // Size unit options
  const sizeUnitOptions = [
    { label: 'Hectares', value: 'hectares' },
    { label: 'Acres', value: 'acres' },
    { label: 'Square Meters', value: 'sqm' },
    { label: 'Square Feet', value: 'sqft' }
  ];

  // Load existing farm data if farmId is provided
  useEffect(() => {
    const loadFarmData = async () => {
      if (farmId && currentUser) {
        try {
          setInitialLoading(true);
          const farmData = await getFarmBasicInfo(currentUser.uid, farmId);
          
          if (farmData) {
            // Map the Firestore data to our form structure
            setFormData({
              farmName: farmData.farmName || '',
              address: farmData.location?.address || '',
              city: farmData.location?.city || '',
              state: farmData.location?.state || '',
              country: farmData.location?.country || '',
              latitude: farmData.location?.coordinates?.latitude?.toString() || '',
              longitude: farmData.location?.coordinates?.longitude?.toString() || '',
              sizeValue: farmData.size?.value?.toString() || '',
              sizeUnit: farmData.size?.unit || 'hectares',
              farmType: farmData.farmType || [],
              yearEstablished: farmData.yearEstablished?.toString() || '',
              description: farmData.description || ''
            });
          }
        } catch (error) {
          console.error('Error loading farm data:', error);
          Alert.alert('Error', 'Failed to load farm data. Please try again.');
        } finally {
          setInitialLoading(false);
        }
      }
    };

    loadFarmData();
  }, [farmId, currentUser]);

  // Handle form input changes
  const handleChange = (name: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.farmName.trim()) {
      newErrors.farmName = 'Farm name is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    
    // Validate size value is a number
    if (formData.sizeValue && isNaN(Number(formData.sizeValue))) {
      newErrors.sizeValue = 'Size must be a number';
    }
    
    // Validate year established is a valid year
    if (formData.yearEstablished) {
      const year = Number(formData.yearEstablished);
      const currentYear = new Date().getFullYear();
      
      if (isNaN(year) || year < 1800 || year > currentYear) {
        newErrors.yearEstablished = `Year must be between 1800 and ${currentYear}`;
      }
    }
    
    // Validate coordinates if provided
    if (formData.latitude && isNaN(Number(formData.latitude))) {
      newErrors.latitude = 'Latitude must be a number';
    }
    
    if (formData.longitude && isNaN(Number(formData.longitude))) {
      newErrors.longitude = 'Longitude must be a number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!currentUser) {
      Alert.alert('Error', 'You must be logged in to save farm data');
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Format the data for Firestore
      const formattedData = {
        farmName: formData.farmName,
        location: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          coordinates: formData.latitude && formData.longitude ? {
            latitude: Number(formData.latitude),
            longitude: Number(formData.longitude)
          } : null
        },
        size: {
          value: formData.sizeValue ? Number(formData.sizeValue) : null,
          unit: formData.sizeUnit
        },
        farmType: formData.farmType,
        yearEstablished: formData.yearEstablished ? Number(formData.yearEstablished) : null,
        description: formData.description
      };
      
      if (farmId) {
        // Update existing farm
        await updateFarmBasicInfo(currentUser?.uid || '', farmId, formattedData);
        Alert.alert('Success', 'Farm information updated successfully');
      } else {
        // Create new farm
        const newFarmId = await saveFarmBasicInfo(currentUser?.uid || '', formattedData);
        Alert.alert('Success', 'Farm information saved successfully');
      }
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      } else {
        // Navigate back to data entry screen
        router.replace('/data_entry');
      }
    } catch (error) {
      console.error('Error saving farm data:', error);
      Alert.alert('Error', 'Failed to save farm data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading farm data...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Surface style={styles.formSurface}>
          <Text style={styles.title}>Basic Farm Information</Text>
          <Text style={styles.subtitle}>
            Enter the basic details about your farm
          </Text>
          
          <Divider style={styles.divider} />
          
          {/* Farm Name */}
          <FormInputField
            label="Farm Name"
            value={formData.farmName}
            onChangeText={(text) => handleChange('farmName', text)}
            error={errors.farmName}
            placeholder="Enter farm name"
            testID="farm-name-input"
          />
          
          {/* Farm Location */}
          <Text style={styles.sectionTitle}>Location</Text>
          
          <FormInputField
            label="Address"
            value={formData.address}
            onChangeText={(text) => handleChange('address', text)}
            error={errors.address}
            placeholder="Enter street address"
          />
          
          <FormInputField
            label="City"
            value={formData.city}
            onChangeText={(text) => handleChange('city', text)}
            error={errors.city}
            placeholder="Enter city"
          />
          
          <FormInputField
            label="State/Province"
            value={formData.state}
            onChangeText={(text) => handleChange('state', text)}
            error={errors.state}
            placeholder="Enter state or province"
          />
          
          <FormInputField
            label="Country"
            value={formData.country}
            onChangeText={(text) => handleChange('country', text)}
            error={errors.country}
            placeholder="Enter country"
          />
          
          <View style={styles.row}>
            <View style={styles.halfField}>
              <FormInputField
                label="Latitude (optional)"
                value={formData.latitude}
                onChangeText={(text) => handleChange('latitude', text)}
                error={errors.latitude}
                placeholder="e.g. 37.7749"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfField}>
              <FormInputField
                label="Longitude (optional)"
                value={formData.longitude}
                onChangeText={(text) => handleChange('longitude', text)}
                error={errors.longitude}
                placeholder="e.g. -122.4194"
                keyboardType="numeric"
              />
            </View>
          </View>
          
          {/* Farm Size */}
          <Text style={styles.sectionTitle}>Farm Size</Text>
          
          <View style={styles.row}>
            <View style={styles.halfField}>
              <FormInputField
                label="Size"
                value={formData.sizeValue}
                onChangeText={(text) => handleChange('sizeValue', text)}
                error={errors.sizeValue}
                placeholder="Enter size"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfField}>
              <FormSelectField
                label="Unit"
                value={formData.sizeUnit}
                options={sizeUnitOptions}
                onChange={(value) => handleChange('sizeUnit', value as string)}
                error={errors.sizeUnit}
              />
            </View>
          </View>
          
          {/* Farm Type */}
          <Text style={styles.sectionTitle}>Farm Type</Text>
          
          <FormSelectField
            label="Farm Type (select all that apply)"
            value={formData.farmType}
            options={farmTypeOptions}
            onChange={(value) => handleChange('farmType', value)}
            error={errors.farmType}
            multiSelect={true}
          />
          
          {/* Year Established */}
          <FormInputField
            label="Year Established (optional)"
            value={formData.yearEstablished}
            onChangeText={(text) => handleChange('yearEstablished', text)}
            error={errors.yearEstablished}
            placeholder="e.g. 2010"
            keyboardType="numeric"
          />
          
          {/* Description */}
          <FormInputField
            label="Description (optional)"
            value={formData.description}
            onChangeText={(text) => handleChange('description', text)}
            error={errors.description}
            placeholder="Enter a brief description of your farm"
            multiline={true}
            numberOfLines={4}
          />
          
          {/* Submit Button */}
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.button}
            loading={loading}
            disabled={loading}
          >
            {farmId ? 'Update Farm Information' : 'Save Farm Information'}
          </Button>
          
          {/* Cancel Button */}
          <Button
            mode="outlined"
            onPress={() => router.replace('/data_entry')}
            style={styles.cancelButton}
            disabled={loading}
          >
            Cancel
          </Button>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
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
  formSurface: {
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
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfField: {
    width: '48%',
  },
  button: {
    marginTop: 24,
  },
  cancelButton: {
    marginTop: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default BasicInforForm;
