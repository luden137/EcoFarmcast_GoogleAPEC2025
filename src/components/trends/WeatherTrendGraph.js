import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

const WeatherTrendGraph = ({ data }) => {
  const theme = useTheme();

  if (!data?.current) {
    return (
      <View style={styles.container}>
        <Text>No weather data available</Text>
      </View>
    );
  }

  const { temperature, humidity, windspeed } = data.current;

  const chartData = {
    labels: ['Temperature', 'Humidity', 'Wind Speed'],
    datasets: [{
      data: [temperature, humidity, windspeed]
    }]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Conditions</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          backgroundColor: theme.colors.surface,
          backgroundGradientFrom: theme.colors.surface,
          backgroundGradientTo: theme.colors.surface,
          decimalPlaces: 1,
          color: (opacity = 1) => theme.colors.tertiary,
          labelColor: () => theme.colors.onSurface,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: theme.colors.tertiary
          }
        }}
        style={styles.chart}
        bezier
      />
      <View style={styles.metricsContainer}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Temperature</Text>
          <Text style={styles.metricValue}>{temperature}°C</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Humidity</Text>
          <Text style={styles.metricValue}>{humidity}%</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Wind Speed</Text>
          <Text style={styles.metricValue}>{windspeed} km/h</Text>
        </View>
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
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  metric: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default WeatherTrendGraph;
