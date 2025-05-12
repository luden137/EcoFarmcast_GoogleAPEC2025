import { USE_DEV_MODE } from '../config/devConfig';

export const MOCK_SUSTAINABILITY_DATA = {
  actionItems: {
    carbonCredits: {
      current: 150,
      potential: 200,
      unit: 'tons CO2e'
    },
    recommendations: [
      {
        title: 'Implement Cover Cropping',
        impact: '+20 carbon credits',
        difficulty: 'Medium',
        description: 'Plant cover crops during off-season to improve soil health and carbon sequestration.'
      },
      {
        title: 'Reduce Tillage',
        impact: '+15 carbon credits',
        difficulty: 'Low',
        description: 'Implement no-till or reduced tillage practices to preserve soil structure.'
      },
      {
        title: 'Optimize Fertilizer Use',
        impact: '+10 carbon credits',
        difficulty: 'Medium',
        description: 'Use precision agriculture to optimize fertilizer application.'
      }
    ]
  },
  analysis: {
    carbonFootprint: {
      current: 45,
      previousYear: 60,
      unit: 'tons CO2e/year',
      breakdown: {
        machinery: 15,
        fertilizer: 20,
        energy: 10
      }
    },
    soilHealth: {
      organicMatter: '3.2%',
      carbonSequestration: '2.5 tons/year',
      soilQuality: 'Good',
      trends: {
        organicMatter: [2.8, 2.9, 3.0, 3.2],
        years: ['2022', '2023', '2024', '2025']
      }
    }
  }
};

export const getSustainabilityData = async (userId) => {
  if (USE_DEV_MODE) {
    return MOCK_SUSTAINABILITY_DATA;
  }

  // TODO: Implement real API call
  throw new Error('Not implemented');
};
