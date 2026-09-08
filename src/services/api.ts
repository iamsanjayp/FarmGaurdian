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

export const analyzeCropImage = async (imageFile: File | null) => {
  if (!imageFile) return null;
  
  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to analyze image with backend, falling back to mock:", error);
    await delay(1000);
    return {
      detected: 'Early Blight (Mock)',
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
  }
};

export const askAgriBot = async (message: string, lang: string = 'mr') => {
  await delay(900);
  const lowerMsg = message.toLowerCase();
  const isMr = lang === 'mr' || /[\u0900-\u097F]/.test(message);
  
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

