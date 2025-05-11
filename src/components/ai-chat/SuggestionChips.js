import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';

const SuggestionChips = ({ suggestions, onSelect }) => {
  const theme = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {suggestions.map((suggestion, index) => (
        <Chip
          key={index}
          mode="outlined"
          onPress={() => onSelect(suggestion)}
          style={styles.chip}
          textStyle={styles.chipText}
        >
          {suggestion}
        </Chip>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 50,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  contentContainer: {
    padding: 8,
    paddingHorizontal: 16,
  },
  chip: {
    marginRight: 8,
  },
  chipText: {
    fontSize: 12,
  },
});

export default SuggestionChips;
