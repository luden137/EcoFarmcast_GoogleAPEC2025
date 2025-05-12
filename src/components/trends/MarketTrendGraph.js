import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, useTheme, Surface } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MarketTrendGraph = ({ data }) => {
  const theme = useTheme();

  if (!data?.crops) {
    return (
      <View style={styles.container}>
        <Text>No market data available</Text>
      </View>
    );
  }

  const chartData = {
    labels: data.crops.map(crop => crop.name),
    datasets: [{
      data: data.crops.map(crop => crop.price)
    }]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crop Market Prices (per ton)</Text>
      
      {/* Market Summary */}
      <Surface style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Icon name="trending-up" size={24} color={theme.colors.primary} />
          <Text style={styles.summaryLabel}>Overall Trend</Text>
          <Text style={styles.summaryValue}>{data.marketSummary.overallTrend}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Icon name="star" size={24} color={theme.colors.primary} />
          <Text style={styles.summaryLabel}>Top Performer</Text>
          <Text style={styles.summaryValue}>{data.marketSummary.topPerformer}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Icon name="currency-usd" size={24} color={theme.colors.primary} />
          <Text style={styles.summaryLabel}>Average Price</Text>
          <Text style={styles.summaryValue}>${data.marketSummary.averagePrice}</Text>
        </View>
      </Surface>

      {/* Price Chart */}
      <BarChart
        data={chartData}
        width={Dimensions.get('window').width - 32}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: theme.colors.surface,
          backgroundGradientFrom: theme.colors.surface,
          backgroundGradientTo: theme.colors.surface,
          decimalPlaces: 0,
          color: (opacity = 1) => theme.colors.primary,
          labelColor: () => theme.colors.onSurface,
          style: {
            borderRadius: 16
          },
          barPercentage: 0.7
        }}
        style={styles.chart}
        showValuesOnTopOfBars
      />

      {/* Price Changes */}
      <View style={styles.priceChangesContainer}>
        {data.crops.map((crop, index) => (
          <View key={index} style={styles.priceChangeItem}>
            <Text style={styles.cropName}>{crop.name}</Text>
            <Text 
              style={[
                styles.priceChange,
                { color: crop.change.startsWith('+') ? theme.colors.primary : theme.colors.error }
              ]}
            >
              {crop.change}
            </Text>
          </View>
        ))}
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
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 1,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  priceChangesContainer: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  priceChangeItem: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  cropName: {
    fontSize: 14,
  },
  priceChange: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default MarketTrendGraph;
