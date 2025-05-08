import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Button, Text, HelperText, useTheme, Divider, List, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Option {
  label: string;
  value: string;
}

interface FormSelectFieldProps {
  label: string;
  value: string | string[];
  options: Option[];
  onChange: (value: string | string[]) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  multiSelect?: boolean;
  testID?: string;
}

const FormSelectField: React.FC<FormSelectFieldProps> = ({
  label,
  value,
  options,
  onChange,
  error,
  placeholder = 'Select an option',
  disabled = false,
  multiSelect = false,
  testID,
}) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const hasError = !!error;

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (selectedValue: string) => {
    if (multiSelect) {
      // For multi-select, toggle the selected value
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(selectedValue)
        ? currentValues.filter(v => v !== selectedValue)
        : [...currentValues, selectedValue];
      
      onChange(newValues);
    } else {
      // For single select, just set the value and close the menu
      onChange(selectedValue);
      closeMenu();
    }
  };

  const getDisplayValue = () => {
    if (multiSelect && Array.isArray(value) && value.length > 0) {
      // For multi-select, show count of selected items
      return `${value.length} selected`;
    } else if (!multiSelect && value) {
      // For single select, show the label of the selected option
      const selectedOption = options.find(option => option.value === value);
      return selectedOption ? selectedOption.label : placeholder;
    }
    return placeholder;
  };

  const isSelected = (optionValue: string) => {
    if (multiSelect && Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.label}>{label}</Text>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode="outlined"
            onPress={openMenu}
            disabled={disabled}
            style={[
              styles.button,
              hasError && styles.errorButton,
            ]}
            contentStyle={styles.buttonContent}
            icon="menu-down"
          >
            {getDisplayValue()}
          </Button>
        }
        style={styles.menu}
      >
        {options.map((option) => (
          <Menu.Item
            key={option.value}
            onPress={() => handleSelect(option.value)}
            title={option.label}
            leadingIcon={
              isSelected(option.value) ? 'check' : undefined
            }
          />
        ))}
        {multiSelect && (
          <>
            <Divider />
            <Menu.Item
              onPress={closeMenu}
              title="Done"
              leadingIcon="check-circle"
            />
          </>
        )}
      </Menu>
      {hasError && (
        <HelperText type="error" visible={hasError} style={styles.errorText}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  button: {
    width: '100%',
    justifyContent: 'space-between',
    height: 56,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorButton: {
    borderColor: 'red',
  },
  menu: {
    width: '80%',
  },
  errorText: {
    marginTop: 4,
  },
});

export default FormSelectField;
