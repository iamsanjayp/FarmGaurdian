import { 
  farmProfile, 
  sensorData, 
  smartAlerts, 
  cropProgress, 
  robotData, 
  weatherData, 
  marketData, 
  cropPerformanceData 
} from '../data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getFarmProfile = async () => {
  await delay(500);
  return farmProfile;
};

export const getSensorData = async () => {
  await delay(500);
  return sensorData;
};

export const getSmartAlerts = async () => {
  await delay(300);
  return smartAlerts;
};

export const getCropProgress = async () => {
  await delay(400);
  return cropProgress;
};

export const getRobotData = async () => {
  await delay(600);
  return robotData;
};

export const getWeatherData = async () => {
  await delay(500);
  return weatherData;
};

export const getMarketData = async (cropFilter?: string, _stateFilter?: string) => {
  await delay(700);
  let data = marketData;
  if (cropFilter && cropFilter !== 'All') {
    data = data.filter(d => d.crop.toLowerCase() === cropFilter.toLowerCase());
  }
  // State filter is mocked out as all our mock data is generally for Tamil Nadu / All India
  return data;
};

export const getCropPerformanceData = async () => {
  await delay(500);
  return cropPerformanceData;
};

export const predictYield = async (_data: any) => {
  await delay(1500);
  return {
    expectedYield: 5800,
    yieldPerHectare: 3050,
    confidence: 84,
    bestCase: 6200,
    worstCase: 5100
  };
};

export const analyzeCropImage = async (_imageFile: File | null) => {
  await delay(2000); // Simulate ML inference delay
  return {
    detected: 'Early Blight',
    confidence: 87,
    riskLevel: 'HIGH',
    symptoms: [
      'Dark lesions',
      'Leaf discoloration',
      'Spreading spots'
    ],
    visualAnalysis: [
      { label: 'Early Blight', value: 87 },
      { label: 'Healthy', value: 8 },
      { label: 'Late Blight', value: 5 }
    ],
    riskFactors: [
      'Visual symptoms',
      'High humidity',
      'Recent rainfall',
      'Crop stage',
      'Historical disease activity'
    ],
    recommendations: [
      'Inspect nearby plants.',
      'Remove severely affected leaves.',
      'Check soil nutrient levels.',
      'Follow appropriate IPM guidance.'
    ]
  };
};

export const askAgriBot = async (message: string) => {
  await delay(1000);
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('monsoon') || lowerMsg.includes('rain')) {
    return "Based on your location and current season, rice, maize and groundnut may be suitable options. I can also compare expected yield and market conditions.";
  }
  
  if (lowerMsg.includes('irrigate') || lowerMsg.includes('water')) {
    return "Your soil moisture is currently 41% and rain is expected tomorrow. Heavy irrigation can be postponed.";
  }
  
  return "I understand. As your AI farming companion, I can help you with crop recommendations, pest control, and interpreting your farm data. Could you provide more specific details?";
};
