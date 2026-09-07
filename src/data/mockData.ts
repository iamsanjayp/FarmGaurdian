export const farmProfile = {
  farmName: 'Sathyamangalam Farm',
  farmerName: 'Guest Farmer',
  location: 'Sathyamangalam, Tamil Nadu',
  currentCrop: 'Rice',
  farmArea: '5 acres',
  sowingDate: '10-04-2026',
  expectedHarvest: '15-08-2026',
  currentStage: 'Vegetative',
  soilType: 'Loamy',
  connectionStatus: 'Connected',
  lastUpdated: '10:42 AM',
};

export const sensorData = {
  soilMoisture: {
    value: 41,
    unit: '%',
    status: 'Optimal',
    trend: 'stable'
  },
  temperature: {
    value: 28.4,
    unit: '°C',
    status: 'Normal',
    trend: 'up'
  },
  humidity: {
    value: 67,
    unit: '%',
    status: 'Normal',
    trend: 'stable'
  },
  npk: {
    n: { value: 42, unit: 'mg/kg', status: 'Low' },
    p: { value: 31, unit: 'mg/kg', status: 'Optimal' },
    k: { value: 58, unit: 'mg/kg', status: 'Optimal' }
  }
};

export const smartAlerts = [
  {
    id: 1,
    type: 'Irrigation',
    title: 'Irrigation Recommended',
    message: 'Soil moisture is slightly low. Recommended irrigation: 20 minutes.',
    severity: 'warning'
  },
  {
    id: 2,
    type: 'Pest',
    title: 'Pest Risk',
    message: 'Possible pest activity detected in Zone B.',
    severity: 'critical'
  },
  {
    id: 3,
    type: 'Fertilizer',
    title: 'Fertilizer Required',
    message: 'Nitrogen level is below optimal range.',
    severity: 'warning'
  },
  {
    id: 4,
    type: 'Weather',
    title: 'Weather Alert',
    message: 'Rain expected tomorrow. Consider postponing irrigation.',
    severity: 'info'
  }
];

export const cropProgress = [
  { stage: 'Land Preparation', completed: true },
  { stage: 'Sowing', completed: true },
  { stage: 'Vegetative', completed: false, current: true, daysRemaining: 15 },
  { stage: 'Flowering', completed: false },
  { stage: 'Harvest', completed: false }
];

export const robotData = {
  status: 'ACTIVE',
  currentZone: 'Zone B',
  currentRow: 4,
  coverage: 64,
  battery: 82,
  speed: 0.6,
  activity: 'Scanning for pests',
  detectionHistory: [
    { time: '09:41', location: 'Zone A', status: 'Healthy' },
    { time: '09:53', location: 'Zone B', status: 'Pest detected', alert: true },
    { time: '10:02', location: 'Zone B', status: 'Plant stress', alert: true },
    { time: '10:18', location: 'Zone C', status: 'Healthy' }
  ]
};

export const weatherData = {
  current: {
    temp: 28,
    humidity: 67,
    condition: 'Partly Cloudy',
    windSpeed: '12 km/h',
    rainProb: '10%'
  },
  forecast: [
    { day: 'Today', temp: '28°C', condition: 'Partly Cloudy', rainProb: '10%' },
    { day: 'Tomorrow', temp: '26°C', condition: 'Rainy', rainProb: '85%' },
    { day: 'Wed', temp: '27°C', condition: 'Cloudy', rainProb: '30%' },
    { day: 'Thu', temp: '29°C', condition: 'Sunny', rainProb: '5%' },
    { day: 'Fri', temp: '30°C', condition: 'Sunny', rainProb: '0%' },
  ],
  irrigationSuitability: {
    today: { status: 'Moderate', reason: 'Soil moisture is slightly low.' },
    tomorrow: { status: 'Poor', reason: 'Rain expected.' },
    dayAfter: { status: 'Good', reason: 'Clear weather post rain.' }
  },
  recommendation: 'Rain probability is high tomorrow. Heavy irrigation can be postponed.'
};

export const marketData = [
  { crop: 'Rice', priceRange: '₹2,800–3,200', unit: 'per quintal', trend: 'up', change: '+2.5%' },
  { crop: 'Wheat', priceRange: '₹2,100–2,400', unit: 'per quintal', trend: 'stable', change: '0%' },
  { crop: 'Cotton', priceRange: '₹5,500–6,200', unit: 'per quintal', trend: 'down', change: '-1.2%' },
  { crop: 'Tomato', priceRange: '₹800–2,200', unit: 'per quintal', trend: 'up', change: '+12%' },
  { crop: 'Onion', priceRange: '₹600–1,400', unit: 'per quintal', trend: 'down', change: '-5%' },
  { crop: 'Potato', priceRange: '₹900–1,500', unit: 'per quintal', trend: 'stable', change: '+0.5%' },
  { crop: 'Soybean', priceRange: '₹3,800–4,500', unit: 'per quintal', trend: 'up', change: '+1.8%' },
  { crop: 'Maize', priceRange: '₹1,500–1,900', unit: 'per quintal', trend: 'stable', change: '0%' },
  { crop: 'Sugarcane', priceRange: '₹280–310', unit: 'per quintal', trend: 'up', change: '+1.1%' },
];

export const cropPerformanceData = [
  { year: 2015, yield: 2450 },
  { year: 2016, yield: 2510 },
  { year: 2017, yield: 2490 },
  { year: 2018, yield: 2600 },
  { year: 2019, yield: 2580 },
  { year: 2020, yield: 2750 },
  { year: 2021, yield: 2800 },
  { year: 2022, yield: 2850 },
  { year: 2023, yield: 2980 },
  { year: 2024, yield: 3050 },
];
