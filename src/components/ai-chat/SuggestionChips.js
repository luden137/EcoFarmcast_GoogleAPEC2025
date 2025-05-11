import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';

const SuggestionChips = ({ suggestions = [], onSelect }) => {
  const theme = useTheme();

  if (!suggestions.length) return null;

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {suggestions.map((suggestion, index) => (
          <Chip
            key={index}
            mode="outlined"
            onPress={() => onSelect(suggestion)}
            style={styles.chip}
            textStyle={styles.chipText}
            selectedColor={theme.colors.primary}
          >
            {suggestion}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingRight: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 4,
  },
  chipText: {
    fontSize: 14,
  },
});

export default SuggestionChips;
