import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { analyzeCropImage, checkBackendHealth } from '../services/api';
import { 
  Upload, Camera, AlertTriangle, ShieldAlert, 
  CheckCircle, Info, Activity, ShieldCheck 
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import './PestDisease.css';

export const PestDisease = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<{ online: boolean; model?: string; val_accuracy?: string }>({ online: false });

  const { language, t } = useLanguage();
  const isMr = language === 'mr';

  useEffect(() => {
    checkBackendHealth().then(status => {
      setBackendStatus(status);
    });
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewUrl(URL.createObjectURL(file));
      setImageUploaded(true);
      
      setAnalyzing(true);
      try {
        const res = await analyzeCropImage(file);
        setResult(res);
      } catch (error) {
        console.error("Error analyzing image:", error);
      } finally {
        setAnalyzing(false);
      }
    }
  };

  const resetUpload = () => {
    setImageUploaded(false);
    setResult(null);
    setPreviewUrl(null);
  };

  // Helper to get display name based on language
  const getDisplayName = () => {
    if (!result) return '';
    if (isMr && result.marathi?.display_name) {
      return result.marathi.display_name;
    }
    return result.detected;
  };

  // Helper to get symptoms list based on language
  const getSymptoms = (): string[] => {
    if (!result) return [];
    if (isMr && result.marathi?.symptoms && result.marathi.symptoms.length > 0) {
      return result.marathi.symptoms;
    }
    return result.symptoms || [];
  };

  // Helper to get recommendations based on language
  const getRecommendations = (): string[] => {
    if (!result) return [];
    if (isMr && result.marathi?.recommendations && result.marathi.recommendations.length > 0) {
      return result.marathi.recommendations;
    }
    return result.recommendations || [];
  };

  const translateRiskLevel = (risk: string) => {
    if (!isMr) return risk;
    switch (risk) {
      case 'CRITICAL': return 'अतिगंभीर (CRITICAL)';
      case 'HIGH': return 'जास्त (HIGH)';
      case 'MODERATE': return 'मध्यम (MODERATE)';
      case 'LOW': return 'कमी (LOW)';
      case 'NONE': return 'धोका नाही (निरोगी)';
      default: return risk;
    }
  };

  return (
    <div className="pest-disease-page">
      <Header 
        title={t('pestDisease.title')} 
        description={t('pestDisease.description')}
      />

      {/* Backend AI Model Status Badge */}
      <div className="ai-status-bar mb-6 flex items-center justify-between p-3 rounded-lg border">
        <div className="flex items-center gap-2">
          <Activity size={18} className={backendStatus.online ? 'text-healthy animate-pulse' : 'text-warning'} />
          <span className="text-sm font-semibold">
            {backendStatus.online 
              ? (isMr ? 'AI मॉडेल सक्रिय: EfficientNet-B0 (९३.९८% अचूकता)' : `AI Model Online: ${backendStatus.model || 'EfficientNet-B0'} (${backendStatus.val_accuracy || '93.98%'} Validation Accuracy)`)
              : (isMr ? 'AI मॉडेल ऑफलाइन (मॉक मोड सक्रिय)' : 'AI Backend Offline (Fallback Mock Active)')}
          </span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-bold ${backendStatus.online ? 'bg-healthy-light text-healthy' : 'bg-warning-light text-warning'}`}>
          {backendStatus.online ? (isMr ? 'सक्रिय' : 'CONNECTED') : (isMr ? 'ऑफलाइन' : 'DISCONNECTED')}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6 mobile-col-1">
        {/* Left Column: Upload & Image */}
        <div className="upload-column flex flex-col gap-6">
          <div className="card upload-card text-center">
            {!imageUploaded ? (
              <div className="upload-placeholder">
                <div className="upload-icon-circle">
                  <Upload size={32} className="text-primary" />
                </div>
                <h3>{t('pestDisease.uploadTitle')}</h3>
                <p>{t('pestDisease.uploadSubtitle')}</p>
                <div className="upload-actions mt-6 flex justify-center gap-4 flex-wrap">
                  <label className="btn btn-primary cursor-pointer flex items-center gap-2">
                    <Upload size={18} /> {t('pestDisease.uploadImage')}
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                  <label className="btn btn-outline cursor-pointer flex items-center gap-2">
                    <Camera size={18} /> {t('pestDisease.takePhoto')}
                    <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
            ) : (
              <div className="image-preview-container relative">
                {previewUrl ? (
                  <img src={previewUrl} alt="Crop Preview" className="w-full h-auto rounded-lg object-cover max-h-80" />
                ) : (
                  <div className="mock-leaf-image">
                    <div className="disease-spot spot-1"></div>
                    <div className="disease-spot spot-2"></div>
                  </div>
                )}
                <div className="image-overlay-actions absolute bottom-4 right-4">
                  <button className="btn btn-outline btn-sm bg-white" onClick={resetUpload}>
                    {isMr ? 'दुसरा फोटो निवडा' : 'Retake'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {analyzing && (
            <div className="card text-center analyzing-card">
              <div className="spinner"></div>
              <h3 className="mt-4">{t('pestDisease.analyzingImage')}</h3>
              <p>{t('pestDisease.analyzingDesc')}</p>
            </div>
          )}

          {result && (
            <div className="card disclaimer-card">
              <Info size={20} className="text-primary flex-shrink-0" />
              <p>
                <strong>{isMr ? 'AI विश्लेषण — प्रत्यक्ष मॉडेल अहवाल' : 'AI Analysis — EfficientNet-B0 Report'}</strong><br />
                {isMr 
                  ? 'हा सल्ला ३८ वनस्पती रोग ओळखणाऱ्या डीप लर्निंग मॉडेलवर आधारित आहे. गंभीर प्रादुर्भावासाठी स्थानिक कृषी तज्ज्ञांचा सल्ला घ्या.'
                  : 'Predictions generated by deep learning model trained on 38 plant disease classes with 93.98% validation accuracy.'}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Results */}
        {result && (
          <div className="results-column flex flex-col gap-6">
            <div className={`card main-result-card ${result.is_healthy ? 'result-healthy' : 'result-diseased'}`}>
              <div className="result-header">
                <div className="detected-disease">
                  <span className="result-label">
                    {result.is_healthy 
                      ? (isMr ? 'पिकाची स्थिती:' : 'Plant Status:') 
                      : (isMr ? 'आढळलेला रोग:' : 'Detected Condition:')}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    {result.is_healthy ? (
                      <ShieldCheck size={28} className="text-healthy" />
                    ) : (
                      <AlertTriangle size={28} className="text-critical" />
                    )}
                    <h2 className={`disease-name ${result.is_healthy ? 'text-healthy' : 'text-critical'}`}>
                      {getDisplayName()}
                    </h2>
                  </div>
                </div>
                <div className={`confidence-badge ${result.is_healthy ? 'confidence-badge-healthy' : ''}`}>
                  {result.confidence}% {isMr ? 'अचूकता' : 'Confidence'}
                </div>
              </div>
              
              <div className="symptoms-list mt-4">
                <span className="result-label">
                  {result.is_healthy 
                    ? (isMr ? 'पिकाची लक्षणे:' : 'Health Characteristics:') 
                    : (isMr ? 'दिसून आलेली लक्षणे:' : 'Identified Symptoms:')}
                </span>
                <ul className="mt-2">
                  {getSymptoms().map((sym: string, i: number) => (
                    <li key={i}>
                      {result.is_healthy ? (
                        <CheckCircle size={15} className="text-healthy flex-shrink-0" />
                      ) : (
                        <AlertTriangle size={15} className="text-warning flex-shrink-0" />
                      )}
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Visual Analysis Chart - Top Predictions */}
            {result.visualAnalysis && result.visualAnalysis.length > 0 && (
              <div className="card visual-analysis-card">
                <h3>{isMr ? 'संभाव्य रोग विश्लेषण (Top Predictions)' : 'TOP AI PREDICTIONS'}</h3>
                <div className="confidence-bars mt-4">
                  {result.visualAnalysis.map((item: any, i: number) => {
                    const isItemHealthy = item.is_healthy || item.label.toLowerCase().includes('healthy');
                    return (
                      <div key={i} className="confidence-bar-item">
                        <div className="bar-labels">
                          <span className="font-medium">{item.label}</span>
                          <span className="font-bold">{item.value}%</span>
                        </div>
                        <div className="bar-track">
                          <div 
                            className={`bar-fill ${
                              i === 0 
                                ? (isItemHealthy ? 'bg-healthy' : 'bg-critical') 
                                : 'bg-primary'
                            }`} 
                            style={{ width: `${Math.max(item.value, 3)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mobile-col-1">
              {/* Risk Level Card */}
              <div className="card risk-card">
                <h3>{isMr ? 'पिकाचा आरोग्य धोका' : 'CROP HEALTH RISK'}</h3>
                <div className={`risk-level mt-2 flex items-center gap-2 ${result.is_healthy ? 'text-healthy' : 'text-critical'}`}>
                  {result.is_healthy ? <ShieldCheck size={26} /> : <ShieldAlert size={26} />}
                  <span className="text-2xl font-bold">
                    {translateRiskLevel(result.riskLevel)}
                  </span>
                </div>
                {result.riskFactors && result.riskFactors.length > 0 && (
                  <div className="risk-factors mt-4">
                    <span className="result-label">{isMr ? 'धोक्याचे घटक / संदर्भ:' : 'Environmental Risk Factors:'}</span>
                    <ul className="mt-2 text-sm text-text-secondary">
                      {result.riskFactors.map((rf: string, i: number) => (
                        <li key={i} className="mb-1">• {rf}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action & Recommendations Card */}
              <div className="card action-card">
                <h3>{isMr ? 'उपाययोजना व शिफारस' : 'RECOMMENDED ACTION'}</h3>
                <ul className="action-list mt-4">
                  {getRecommendations().map((rec: string, i: number) => (
                    <li key={i} className="flex gap-2 mb-3">
                      <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
