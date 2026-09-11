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

// API Configuration: supports separate backend (via VITE_API_URL) or unified single-origin Docker deployment
export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');


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

export const getSmartAlerts = async (crop: string = 'Rice', sowingDate: string = '2026-04-10') => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/smart-guidance?crop=${encodeURIComponent(crop)}&sowing_date=${encodeURIComponent(sowingDate)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.alerts && data.alerts.length > 0) return data.alerts;
    }
  } catch (err) {
    console.warn("Failed to fetch smart alerts from backend, using fallback:", err);
  }
  await delay(300);
  return smartAlerts;
};

export const getCropProgress = async (crop: string = 'Rice', sowingDate: string = '2026-04-10') => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/smart-guidance?crop=${encodeURIComponent(crop)}&sowing_date=${encodeURIComponent(sowingDate)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.lifecycleStages && data.lifecycleStages.length > 0) return data.lifecycleStages;
    }
  } catch (err) {
    console.warn("Failed to fetch crop progress from backend, using fallback:", err);
  }
  await delay(300);
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

export const getMarketData = async (cropFilter: string = 'All', stateFilter: string = 'Maharashtra') => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/market-prices?state=${encodeURIComponent(stateFilter)}&crop=${encodeURIComponent(cropFilter)}`
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (err) {
    console.warn("Failed to fetch market data from backend, falling back:", err);
  }
  await delay(400);
  let data = marketData;
  if (cropFilter && cropFilter !== 'All') {
    data = data.filter(d => d.crop.toLowerCase() === cropFilter.toLowerCase());
  }
  return data;
};

export const getCropPerformanceData = async (crop: string = 'Rice') => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/crop-performance?crop=${encodeURIComponent(crop)}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn("Failed to fetch crop performance from backend, falling back:", err);
  }
  await delay(400);
  return {
    crop,
    yearlyData: cropPerformanceData,
    avgGrowth: '+2.47%',
    bestYear: { year: 2024, yield: 3050 },
    worstYear: { year: 2015, yield: 2450 },
    forecast: { nextYear: 3125, in3Years: 3280, in5Years: 3450 },
    aiRecommendation: `${crop} exhibits consistent historical productivity. Regular soil monitoring and timely irrigation will sustain this upward trend.`,
    aiRecommendationMr: `${crop} पिकाच्या उत्पादनात सातत्याने वाढ होत असून आधुनिक कृषी पद्धतींचा वापर केल्यास आगामी वर्षांत अधिक फायदा होईल.`
  };
};

export const predictYield = async (formData: { crop: string; area: number | string; soil: string; stage: string; sowing_date?: string }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/predict-yield`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        crop: formData.crop || 'Rice',
        area: Number(formData.area) || 5,
        soil: formData.soil || 'Loamy',
        stage: formData.stage || 'Vegetative',
        sowing_date: formData.sowing_date || ''
      })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Failed to predict yield with backend, falling back:", err);
  }
  await delay(600);
  const areaNum = Number(formData.area) || 5;
  const expected = Math.round(areaNum * 1200);
  return {
    expectedYield: expected,
    yieldPerHectare: Math.round((expected / areaNum) * 2.471),
    confidence: 85,
    bestCase: Math.round(expected * 1.15),
    worstCase: Math.round(expected * 0.85),
    factors: [
      { name: 'Soil condition', status: 'Optimal', level: 'healthy' },
      { name: 'Weather forecast', status: 'Favorable', level: 'water' },
      { name: 'Crop growth stage', status: 'On Track', level: 'warning' },
      { name: 'Historical regional yield', status: 'High', level: 'healthy' },
      { name: 'Irrigation management', status: 'Needs attention', level: 'warning' }
    ]
  };
};

export const getFarmEconomicsData = async (crop: string = 'Rice', area: number = 5) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/farm-economics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ crop, area: Number(area) || 5 })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Failed to fetch farm economics from backend, falling back:", err);
  }
  await delay(400);
  return {
    crop,
    area,
    seedCost: 1000 * area,
    fertilizerCost: 2400 * area,
    labourCost: 7000 * area,
    irrigationCost: 1600 * area,
    pesticideCost: 2100 * area,
    otherCosts: 4200 * area,
    expectedYieldPerAcre: 1160,
    pricePerKg: 30,
    economicAdvice: "Optimizing fertilizer dosage with soil testing can reduce input costs by 15% without sacrificing yield.",
    economicAdviceMr: "माती परीक्षणावर आधारित खत व्यवस्थापन केल्यास उत्पादन खर्चात १५% पर्यंत बचत शक्य आहे."
  };
};

export const getSmartGuidanceReport = async (crop: string = 'Rice', sowingDate: string = '2026-04-10') => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/smart-guidance?crop=${encodeURIComponent(crop)}&sowing_date=${encodeURIComponent(sowingDate)}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Failed to fetch smart guidance from backend, falling back:", err);
  }
  return null;
};

export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
    if (!response.ok) return { online: false, error: response.statusText };
    const data = await response.json();
    return { online: true, ...data };
  } catch (err: any) {
    return { online: false, error: err.message };
  }
};

export const analyzeCropImage = async (imageFile: File | null) => {
  if (!imageFile) return null;
  
  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to analyze image with backend, falling back to mock:", error);
    await delay(1000);
    return {
      detected: 'Tomato — Early Blight (Mock)',
      detected_raw: 'Tomato___Early_blight',
      plant: 'Tomato',
      disease: 'Early Blight',
      is_healthy: false,
      confidence: 87.5,
      riskLevel: 'HIGH',
      symptoms: [
        'Dark concentric circular lesions (bullseye pattern) on older leaves',
        'Leaf tissue surrounding spots turns yellow',
        'Premature defoliation starting from lower foliage'
      ],
      visualAnalysis: [
        { label: 'Tomato — Early Blight', value: 87.5, is_healthy: false },
        { label: 'Tomato — Healthy', value: 8.0, is_healthy: true },
        { label: 'Tomato — Late Blight', value: 4.5, is_healthy: false }
      ],
      riskFactors: [
        'Warm temperatures (24–29°C)',
        'Alternating wet and dry periods',
        'Soil splash carrying fungal spores onto lower leaves'
      ],
      recommendations: [
        'Prune lower 12 inches of foliage to eliminate soil-splash spore entry.',
        'Apply chlorothalonil or copper-based fungicides.',
        'Mulch heavily with straw or plastic to create a physical barrier over soil spores.',
        'Water strictly at root level using drip irrigation.'
      ]
    };
  }
};

export const askAgriBot = async (message: string, history: any[] = [], lang: string = 'mr') => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/agribot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history, language: lang })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.reply) return data.reply;
    }
  } catch (err) {
    console.warn("Backend AgriBot error, falling back:", err);
  }

  await delay(800);
  const lowerMsg = message.toLowerCase();
  const isMr = lang === 'mr' || /[\u0900-\u097F]/.test(message);
  
  // Guardrail check in client fallback
  const offTopic = ["movie", "cinema", "cricket", "football", "song", "actor", "code", "python", "game", "president"];
  if (offTopic.some(w => lowerMsg.includes(w))) {
    return isMr
      ? "मी केवळ कृषी AI सहाय्यक आहे. मी शेतीव्यतिरिक्त इतर विषयांवर मार्गदर्शन करू शकत नाही. कृपया पिके, माती, खते किंवा हवामानाविषयी विचारा."
      : "I specialize exclusively as an agricultural AI assistant. I cannot answer non-farming queries, but I am here to help you with crops, soil, pests, irrigation, or farm economics.";
  }

  if (lowerMsg.includes('monsoon') || lowerMsg.includes('rain') || lowerMsg.includes('पाऊस') || lowerMsg.includes('मान्सून')) {
    return isMr
      ? "आपल्या परिसरातील हवामान आणि चालू हंगामाच्या स्थितीनुसार भात (तांदूळ), मका आणि भुईमूग ही पिके अत्यंत फायदेशीर ठरू शकतात. उद्या पावसाची शक्यता असल्याने पाणी व्यवस्थापनाचे नियोजन योग्य ठेवावे."
      : "Based on your location and current season, rice, maize and groundnut may be suitable options. I can also compare expected yield and market conditions.";
  }
  
  if (lowerMsg.includes('irrigate') || lowerMsg.includes('water') || lowerMsg.includes('सिंचन') || lowerMsg.includes('पाणी')) {
    return isMr
      ? "आपल्या शेतातील मातीतील ओलावा सध्या ४१% आहे आणि उद्या ८५% पाऊस अपेक्षित आहे. त्यामुळे आज पिकांना जास्त पाणी देणे पुढे ढकलावे, ज्यामुळे पाणी वाचेल व मुळांचे नुकसान टळेल."
      : "Your soil moisture is currently 41% and rain is expected tomorrow. Heavy irrigation can be postponed to conserve water.";
  }

  if (lowerMsg.includes('pest') || lowerMsg.includes('कीड') || lowerMsg.includes('कीटक')) {
    return isMr
      ? "क्षेत्र B (Zone B) मध्ये सेन्सर्सनी कीटकांचे प्राथमिक संकेत नोंदवले आहेत. खोडकिडा किंवा पानांवरील चट्ट्यांसाठी ५% निंबोळी अर्क किंवा शिफारस केलेले बुरशीनाशक फवारण्याचा सल्ला आहे."
      : "Robot telemetry detected possible pest stress in Zone B. Inspect leaf undersides and apply neem oil or recommended IPM biocides.";
  }

  if (lowerMsg.includes('fertilizer') || lowerMsg.includes('खत') || lowerMsg.includes('युरिया')) {
    return isMr
      ? "आपल्या शेतात नायट्रोजनचे प्रमाण सध्या कमी आहे. पिकाच्या वाढीच्या अवस्थेत एकरी २० ते २५ किलो युरिया किंवा गांडूळ खताचा हप्ता देण्याची शिफारस आहे."
      : "Nitrogen level is currently low in your field. Apply 20-25 kg/acre Urea or enriched compost during the vegetative stage.";
  }

  if (lowerMsg.includes('organic') || lowerMsg.includes('सेंद्रिय')) {
    return isMr
      ? "जीवामृत, गांडूळ खत आणि दशपर्णी अर्काचा वापर केल्याने जमिनीतील सूक्ष्मजीवांची वाढ होते आणि रासायनिक खतांवरील खर्चात मोठी बचत होते."
      : "Organic practices like jeevamrut, vermicompost, and bio-fertilizers improve soil biology and reduce chemical input costs.";
  }

  if (lowerMsg.includes('rotation') || lowerMsg.includes('फेरपालट')) {
    return isMr
      ? "धान्य पिकांनंतर कडधान्य (उदा. हरभरा, मूग किंवा सोयाबीन) पिकांची फेरपालट केल्यास जमिनीची सुपीकता टिकून राहते व कीटकांचा प्रादुर्भाव घटतो."
      : "Rotating cereal crops with legumes fixes atmospheric nitrogen, breaks pest lifecycles, and revitalizes soil health.";
  }
  
  return isMr
    ? "मी आपला कृषीबॉट सहाय्यक आहे. मी आपल्याला पीक सल्ला, कीड नियंत्रण, खत व्यवस्थापन आणि हवामान माहितीबाबत अचूक मार्गदर्शन करू शकेन. आपल्याला आणखी कोणत्या विषयावर माहिती हवी आहे?"
    : "I understand. As your AI farming companion, I can help you with crop recommendations, pest control, and interpreting your farm data. Could you provide more specific details?";
};
