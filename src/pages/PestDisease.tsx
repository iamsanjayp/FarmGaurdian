import { useState } from 'react';
import { Header } from '../components/Header';
import { analyzeCropImage } from '../services/api';
import { Upload, Camera, AlertTriangle, ShieldAlert, CheckCircle, Info } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import './PestDisease.css';

export const PestDisease = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { language, t } = useLanguage();
  const isMr = language === 'mr';

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

  const translateSymptom = (sym: string) => {
    if (!isMr) return sym;
    if (sym.includes('Dark lesions')) return 'गडद काळे चट्टे';
    if (sym.includes('Leaf discoloration')) return 'पानांचा रंग पिवळसर पडणे';
    if (sym.includes('Spreading spots')) return 'पानांवर पसरणारे डाग व बुरशी';
    return sym;
  };

  const translateRiskFactor = (rf: string) => {
    if (!isMr) return rf;
    if (rf.includes('Visual symptoms')) return 'पानांवरील दृश्य लक्षणे';
    if (rf.includes('High humidity')) return 'हवेतील जास्त आर्द्रता';
    if (rf.includes('Recent rainfall')) return 'नुकताच झालेला पाऊस';
    if (rf.includes('Crop stage')) return 'पिकाची वाढीची संवेदनशील अवस्था';
    if (rf.includes('Historical')) return 'मागील रोग प्रादुर्भाव इतिहास';
    return rf;
  };

  const translateRecommendation = (rec: string) => {
    if (!isMr) return rec;
    if (rec.includes('Inspect nearby')) return 'आजूबाजूच्या पिकांची व झाडांची काळजीपूर्वक पाहणी करा.';
    if (rec.includes('Remove severely')) return 'जास्त प्रादुर्भाव झालेली रोगट पाने तोडून शेताबाहेर नष्ट करा.';
    if (rec.includes('nutrient')) return 'मातीतील अन्नद्रव्यांची पातळी तपासून योग्य खत द्या.';
    if (rec.includes('IPM')) return 'कृषी विद्यापीठाने शिफारस केलेले बुरशीनाशक फवारा (IPM मार्गदर्शक).';
    return rec;
  };

  return (
    <div className="pest-disease-page">
      <Header 
        title={t('pestDisease.title')} 
        description={t('pestDisease.description')}
      />

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
                  <img src={previewUrl} alt="Crop Preview" className="w-full h-auto rounded-lg object-cover max-h-64" />
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
                <strong>{isMr ? 'AI विश्लेषण — प्राथमिक सल्ला' : 'AI Analysis — Advisory Prototype'}</strong><br />
                {isMr 
                  ? 'हा AI सल्ला प्राथमिक तपासणीसाठी आहे. गंभीर प्रादुर्भावासाठी स्थानिक कृषी अधिकाऱ्यांचा सल्ला घ्या.'
                  : 'This AI output is an advisory. Severe cases should be verified by an agricultural expert.'}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Results */}
        {result && (
          <div className="results-column flex flex-col gap-6">
            <div className="card main-result-card">
              <div className="result-header">
                <div className="detected-disease">
                  <span className="result-label">{isMr ? 'आढळलेला रोग:' : 'Detected:'}</span>
                  <h2 className="disease-name text-critical">
                    {isMr ? 'करपा रोग (Early Blight)' : result.detected}
                  </h2>
                </div>
                <div className="confidence-badge">
                  {result.confidence}% {isMr ? 'अचूकता' : 'Match'}
                </div>
              </div>
              
              <div className="symptoms-list mt-4">
                <span className="result-label">{isMr ? 'दिसून आलेली लक्षणे:' : 'Symptoms:'}</span>
                <ul className="mt-2">
                  {result.symptoms.map((sym: string, i: number) => (
                    <li key={i}><AlertTriangle size={14} className="text-warning flex-shrink-0"/> {translateSymptom(sym)}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card visual-analysis-card">
              <h3>{isMr ? 'संभाव्य रोग विश्लेषण' : 'VISUAL ANALYSIS'}</h3>
              <div className="confidence-bars mt-4">
                {result.visualAnalysis.map((item: any, i: number) => {
                  const label = isMr 
                    ? (item.label === 'Early Blight' ? 'करपा रोग (Early Blight)' : item.label === 'Healthy' ? 'निरोगी (Healthy)' : 'उशिरा येणारा करपा (Late Blight)')
                    : item.label;
                  return (
                    <div key={i} className="confidence-bar-item">
                      <div className="bar-labels">
                        <span>{label}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="bar-track">
                        <div className={`bar-fill ${i === 0 ? 'bg-critical' : 'bg-primary'}`} style={{ width: `${item.value}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mobile-col-1">
              <div className="card risk-card">
                <h3>{isMr ? 'पिकाचा आरोग्य धोका' : 'CROP HEALTH RISK'}</h3>
                <div className="risk-level mt-2 text-critical flex items-center gap-2">
                  <ShieldAlert size={24} />
                  <span className="text-2xl font-bold">
                    {isMr ? (result.riskLevel === 'HIGH' ? 'जास्त (HIGH)' : result.riskLevel) : result.riskLevel}
                  </span>
                </div>
                <div className="risk-factors mt-4">
                  <span className="result-label">{isMr ? 'धोक्याचे घटक:' : 'Risk factors:'}</span>
                  <ul className="mt-2 text-sm text-text-secondary">
                    {result.riskFactors.map((rf: string, i: number) => (
                      <li key={i}>• {translateRiskFactor(rf)}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card action-card">
                <h3>{isMr ? 'उपाययोजना व शिफारस' : 'RECOMMENDED ACTION'}</h3>
                <ul className="action-list mt-4">
                  {result.recommendations.map((rec: string, i: number) => (
                    <li key={i} className="flex gap-2 mb-2">
                      <CheckCircle size={16} className="text-primary flex-shrink-0 mt-1" />
                      <span className="text-sm">{translateRecommendation(rec)}</span>
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

