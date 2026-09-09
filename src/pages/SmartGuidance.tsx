import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { getSmartAlerts, getCropProgress, getWeatherData } from '../services/api';
import { Lightbulb, AlertTriangle, CloudRain, ShieldAlert, Sprout, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import './SmartGuidance.css';

export const SmartGuidance = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { language, t } = useLanguage();
  const isMr = language === 'mr';

  // Form State
  const [crop, setCrop] = useState('Rice');
  const [sowingDate, setSowingDate] = useState('2026-04-10');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [aData, pData, wData] = await Promise.all([
        getSmartAlerts(),
        getCropProgress(),
        getWeatherData()
      ]);
      setAlerts(aData);
      setProgress(pData);
      setWeather(wData);
      setLoading(false);
    };
    fetchData();
  }, [crop, sowingDate]);

  if (loading) {
    return <div className="loading-state">{t('common.loading')}</div>;
  }

  const getAlertIcon = (type: string) => {
    if (type === 'Irrigation') return <CloudRain size={20} className="text-water" />;
    if (type === 'Pest') return <ShieldAlert size={20} className="text-critical" />;
    if (type === 'Fertilizer') return <Sprout size={20} className="text-primary" />;
    return <AlertTriangle size={20} className="text-warning" />;
  };

  const getLocalizedAlert = (alert: any) => {
    if (!isMr) return { title: alert.title, message: alert.message };
    switch (alert.id) {
      case 1:
        return {
          title: 'सिंचन शिफारस',
          message: 'मातीतील ओलावा किंचित कमी आहे. २० मिनिटे हलके पाणी देण्याची शिफारस आहे.'
        };
      case 2:
        return {
          title: 'कीटक प्रादुर्भाव धोका',
          message: 'क्षेत्र B (Zone B) मध्ये कीटकांची लक्षणे दिसून आली आहेत.'
        };
      case 3:
        return {
          title: 'खतांची आवश्यकता',
          message: 'नायट्रोजनची पातळी इष्टतम मर्यादेपेक्षा कमी नोंदवली गेली आहे.'
        };
      case 4:
        return {
          title: 'हवामान पूर्वसूचना',
          message: 'उद्या पाऊस पडण्याची शक्यता आहे. सिंचन पुढे ढकलण्याचा विचार करा.'
        };
      default:
        return { title: alert.title, message: alert.message };
    }
  };

  const getStageTitle = (stage: string) => {
    if (!isMr) return stage;
    switch (stage) {
      case 'Land Preparation': return t('stages.landPreparation');
      case 'Sowing': return t('stages.sowing');
      case 'Vegetative': return t('stages.vegetative');
      case 'Flowering': return t('stages.flowering');
      case 'Harvest': return t('stages.harvest');
      default: return stage;
    }
  };

  const cropTitle = isMr ? (crop === 'Rice' ? t('crops.rice') : t('crops.wheat')) : crop;

  return (
    <div className="smart-guidance-page">
      <Header 
        title={t('smartGuidance.title')} 
        description={t('smartGuidance.description')}
      />

      <div className="filter-bar mb-6 flex gap-4 flex-wrap">
        <div className="form-group inline-form-group mb-0">
          <label>{t('smartGuidance.selectCrop')}</label>
          <select value={crop} onChange={e => setCrop(e.target.value)} style={{ width: '150px' }}>
            <option value="Rice">{isMr ? t('crops.rice') : 'Rice'}</option>
            <option value="Wheat">{isMr ? t('crops.wheat') : 'Wheat'}</option>
          </select>
        </div>
        <div className="form-group inline-form-group mb-0">
          <label>{t('smartGuidance.sowingDate')}</label>
          <input type="date" value={sowingDate} onChange={e => setSowingDate(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mobile-col-1">
        
        {/* Left Column: Recommendations and Alerts */}
        <div className="col-span-1 flex flex-col gap-6">
          <div className="card recommendation-card shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="text-primary" size={24} />
              <h3 className="mb-0">{t('dashboard.todaysRecommendation')}</h3>
            </div>
            <p className="recommendation-text mb-0">
              {isMr 
                ? '"आज २० मिनिटे हलके पाणी द्या आणि नायट्रोजन खत पातळीवर लक्ष ठेवा. उद्या पाऊस पडण्याची शक्यता ८५% आहे."'
                : `"Irrigate today for 20 minutes and monitor nitrogen levels. ${weather?.recommendation}"`}
            </p>
          </div>

          <div className="card alerts-container">
            <h3>{t('smartGuidance.activeAlerts')}</h3>
            <div className="alerts-list mt-4">
              {alerts.map((alert) => {
                const locAlert = getLocalizedAlert(alert);
                return (
                  <div key={alert.id} className={`guidance-alert-item alert-${alert.severity}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {getAlertIcon(alert.type)}
                      <h4>{locAlert.title}</h4>
                    </div>
                    <p>{locAlert.message}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Crop Lifecycle */}
        <div className="card col-span-2 lifecycle-card">
          <h3>{isMr ? `पिकाचे जीवनचक्र: ${cropTitle}` : `Crop Lifecycle: ${crop}`}</h3>
          
          <div className="lifecycle-stepper mt-8">
            {progress.map((stage, idx) => (
              <div key={idx} className={`step-item ${stage.completed ? 'completed' : ''} ${stage.current ? 'current' : ''}`}>
                <div className="step-marker">
                  {stage.completed ? <Check size={16} /> : <span>{idx + 1}</span>}
                </div>
                <div className="step-label">{getStageTitle(stage.stage)}</div>
              </div>
            ))}
            <div className="step-line"></div>
            <div className="step-line-active" style={{ width: '40%' }}></div>
          </div>

          <div className="current-stage-details mt-10 p-6 bg-bg-main rounded-lg border border-border">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-color-border-light">
              <div>
                <span className="text-sm text-text-secondary uppercase font-bold tracking-wide">
                  {isMr ? 'सध्याची अवस्था' : 'Current Stage'}
                </span>
                <h2 className="text-primary-dark mt-1">{isMr ? t('stages.vegetative') : 'Vegetative'}</h2>
              </div>
              <div className="text-right">
                <span className="text-sm text-text-secondary block">{isMr ? 'कालावधी' : 'Timing'}</span>
                <span className="font-semibold text-lg">{isMr ? 'दिवस १५–४५' : 'Day 15–45'}</span>
              </div>
            </div>

            <div className="stage-actions">
              <h4 className="mb-3 flex items-center gap-2">
                <Sprout size={18} className="text-primary" /> {isMr ? 'आजच्या शिफारस केलेल्या कृती:' : 'Recommended Actions:'}
              </h4>
              <ul className="action-checklist">
                <li>
                  <div className="checklist-box"></div>
                  <span>{isMr ? 'पिकात योग्य पाणी पातळी (२-३ सेमी) राखा' : 'Maintain proper water level (2-3 cm)'}</span>
                </li>
                <li>
                  <div className="checklist-box"></div>
                  <span>{isMr ? 'जमिनीतील ओलावा नियमितपणे तपासा' : 'Monitor soil moisture regularly'}</span>
                </li>
                <li>
                  <div className="checklist-box"></div>
                  <span>{isMr ? 'शिफारशीत नायट्रोजन खतांचा हलका हप्ता द्या' : 'Apply recommended nitrogen top-dressing'}</span>
                </li>
                <li>
                  <div className="checklist-box"></div>
                  <span>{isMr ? 'खोडकिडीच्या प्राथमिक लक्षणांवर नजर ठेवा' : 'Check for early pest activity (stem borer)'}</span>
                </li>
                <li>
                  <div className="checklist-box"></div>
                  <span>{isMr ? 'तण नियंत्रण वेळेवर करून पिकाची वाढ सुलभ करा' : 'Weed management to reduce competition'}</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

