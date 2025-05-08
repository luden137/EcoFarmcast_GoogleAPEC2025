import React from 'react';
import { View, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { TextInput, HelperText, useTheme } from 'react-native-paper';

interface FormInputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  testID?: string;
}

const FormInputField: React.FC<FormInputFieldProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  disabled = false,
  left,
  right,
  autoCapitalize = 'sentences',
  testID,
}) => {
  const theme = useTheme();
  const hasError = !!error;

  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        error={hasError}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
        disabled={disabled}
        left={left}
        right={right}
        mode="outlined"
        style={styles.input}
        autoCapitalize={autoCapitalize}
        testID={testID}
      />
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
  },
  input: {
    width: '100%',
  },
  errorText: {
    marginTop: 4,
  },
});

export default FormInputField;
