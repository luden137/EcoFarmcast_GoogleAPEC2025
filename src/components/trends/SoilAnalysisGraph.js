import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';

const SoilAnalysisGraph = ({ data }) => {
  const theme = useTheme();

  if (!data?.metrics) {
    return (
      <View style={styles.container}>
        <Text>No soil data available</Text>
      </View>
    );
  }

  const { ph, nitrogen, phosphorus, potassium, qualityIndex } = data.metrics;

  const chartData = {
    labels: ['pH', 'N', 'P', 'K', 'Quality'],
    datasets: [{
      data: [ph, nitrogen, phosphorus, potassium, qualityIndex]
    }]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soil Analysis Metrics</Text>
      <BarChart
        data={chartData}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          backgroundColor: theme.colors.surface,
          backgroundGradientFrom: theme.colors.surface,
          backgroundGradientTo: theme.colors.surface,
          decimalPlaces: 1,
          color: (opacity = 1) => theme.colors.secondary,
          labelColor: () => theme.colors.onSurface,
          style: {
            borderRadius: 16
          },
          barPercentage: 0.7
        }}
        style={styles.chart}
        showValuesOnTopOfBars
      />
      <View style={styles.legend}>
        <Text style={styles.legendText}>
          Quality Index: {qualityIndex}/100
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legend: {
    marginTop: 8,
    alignItems: 'center',
  },
  legendText: {
    fontSize: 14,
    opacity: 0.8,
  }
});

export default SoilAnalysisGraph;
