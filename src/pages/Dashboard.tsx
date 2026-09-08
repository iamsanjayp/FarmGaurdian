import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { getSensorData, getSmartAlerts, getCropProgress, getFarmProfile, getRobotData, getWeatherData } from '../services/api';
import { Droplets, Thermometer, CloudRain, Sprout, AlertTriangle, Activity, Battery, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import './Dashboard.css';

export const Dashboard = () => {
  const [sensors, setSensors] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [farm, setFarm] = useState<any>(null);
  const [robot, setRobot] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isMr = language === 'mr';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [sData, aData, pData, fData, rData, wData] = await Promise.all([
        getSensorData(),
        getSmartAlerts(),
        getCropProgress(),
        getFarmProfile(),
        getRobotData(),
        getWeatherData()
      ]);
      setSensors(sData);
      setAlerts(aData);
      setProgress(pData);
      setFarm(fData);
      setRobot(rData);
      setWeather(wData);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="loading-state">{t('common.loading')}</div>;
  }

  const getStatusTranslation = (status: string) => {
    if (!isMr) return status;
    switch (status) {
      case 'Optimal': return t('common.optimal');
      case 'Normal': return t('common.normal');
      case 'Low': return t('common.low');
      case 'High': return t('common.high');
      default: return status;
    }
  };

  const getStageTranslation = (stage: string) => {
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

  const getAlertTranslation = (alert: any) => {
    if (!isMr) return { title: alert.type, message: alert.message };
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
        return { title: alert.type, message: alert.message };
    }
  };

  const recommendationText = isMr
    ? 'उद्या पाऊस पडण्याची शक्यता जास्त आहे. त्यामुळे आज मोठे पाणी देणे टाळता येईल.'
    : weather?.recommendation;

  const robotActivityText = isMr
    ? 'कीटक आणि पिकांवरील ताणाची स्वयंचलित पाहणी सुरू आहे'
    : robot?.activity;

  const currentZoneText = isMr ? 'क्षेत्र B' : (robot?.currentZone || 'Zone B');

  return (
    <div className="dashboard">
      <Header 
        title={t('dashboard.greeting')} 
        description={t('dashboard.subtitle')}
      />

      <div className="dashboard-grid">
        {/* Main Column */}
        <div className="main-col">
          
          {/* Recommendation */}
          <div className="card recommendation-card">
            <div className="card-header">
              <h3>{t('dashboard.todaysRecommendation')}</h3>
              <Sprout className="text-primary" />
            </div>
            <p className="recommendation-text">{recommendationText}</p>
          </div>

          {/* Sensors */}
          <h3 className="section-title mt-6">{t('dashboard.liveSensors')}</h3>
          <div className="sensor-grid">
            <div className="card sensor-card">
              <div className="sensor-header">
                <span className="sensor-title">{t('dashboard.soilMoisture')}</span>
                <Droplets className="text-water" size={20} />
              </div>
              <div className="sensor-value">{sensors?.soilMoisture.value}{sensors?.soilMoisture.unit}</div>
              <div className="badge badge-water mt-2">{getStatusTranslation(sensors?.soilMoisture.status)}</div>
            </div>
            <div className="card sensor-card">
              <div className="sensor-header">
                <span className="sensor-title">{t('dashboard.temperature')}</span>
                <Thermometer className="text-warning" size={20} />
              </div>
              <div className="sensor-value">{sensors?.temperature.value}{sensors?.temperature.unit}</div>
              <div className="badge badge-healthy mt-2">{getStatusTranslation(sensors?.temperature.status)}</div>
            </div>
            <div className="card sensor-card">
              <div className="sensor-header">
                <span className="sensor-title">{t('dashboard.humidity')}</span>
                <CloudRain className="text-water" size={20} />
              </div>
              <div className="sensor-value">{sensors?.humidity.value}{sensors?.humidity.unit}</div>
              <div className="badge badge-healthy mt-2">{getStatusTranslation(sensors?.humidity.status)}</div>
            </div>
            <div className="card sensor-card">
              <div className="sensor-header">
                <span className="sensor-title">{t('dashboard.npk')}</span>
                <Activity className="text-primary" size={20} />
              </div>
              <div className="sensor-value npk-values">
                <span>N: {sensors?.npk.n.value}</span>
                <span>P: {sensors?.npk.p.value}</span>
                <span>K: {sensors?.npk.k.value}</span>
              </div>
              <div className="badge badge-warning mt-2">{t('dashboard.nIsLow')}</div>
            </div>
          </div>

          {/* Crop Progress & Overview */}
          <div className="grid grid-cols-2 mt-6 gap-6 mobile-col-1">
            <div className="card">
              <h3>{t('dashboard.cropProgress')}</h3>
              <div className="progress-timeline mt-4">
                {progress.map((stage, idx) => (
                  <div key={idx} className={`timeline-item ${stage.completed ? 'completed' : ''} ${stage.current ? 'current' : ''}`}>
                    <div className="timeline-marker">
                      {stage.completed ? <Check size={14} /> : <div className="dot"></div>}
                    </div>
                    <div className="timeline-content">
                      <h4>{getStageTranslation(stage.stage)}</h4>
                      {stage.current && (
                        <span className="timeline-meta">
                          {stage.daysRemaining} {t('stages.daysRemaining')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card">
              <h3>{t('dashboard.farmOverview')}</h3>
              <div className="overview-list mt-4">
                <div className="overview-item">
                  <span className="overview-label">{t('dashboard.farmArea')}</span>
                  <span className="overview-value">{isMr ? '५ एकर' : farm?.farmArea}</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">{t('dashboard.currentCrop')}</span>
                  <span className="overview-value">{isMr ? t('crops.rice') : farm?.currentCrop}</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">{t('dashboard.sowingDate')}</span>
                  <span className="overview-value">{farm?.sowingDate}</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">{t('dashboard.expectedHarvest')}</span>
                  <span className="overview-value">{farm?.expectedHarvest}</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">{t('dashboard.estimatedYield')}</span>
                  <span className="overview-value text-primary">~५,८०० किलो (~5,800 kg)</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Side Column */}
        <div className="side-col">
          
          {/* Smart Alerts */}
          <div className="card alerts-card">
            <div className="card-header">
              <h3>{t('dashboard.smartAlerts')}</h3>
              <AlertTriangle className="text-warning" size={20} />
            </div>
            <div className="alerts-list mt-4">
              {alerts.map((alert) => {
                const localizedAlert = getAlertTranslation(alert);
                return (
                  <div key={alert.id} className={`alert-item alert-${alert.severity}`}>
                    <h4>{localizedAlert.title}</h4>
                    <p>{localizedAlert.message}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Robot Status */}
          <div className="card robot-card mt-6">
            <div className="card-header">
              <h3>{t('dashboard.robotStatus')}</h3>
              <div className="connection-status">
                <span className="status-dot"></span>
                <span>{isMr ? t('common.active') : robot?.status}</span>
              </div>
            </div>
            <div className="robot-stats mt-4">
              <div className="robot-stat">
                <span className="stat-label">{t('dashboard.currentZone')}</span>
                <span className="stat-value">{currentZoneText}</span>
              </div>
              <div className="robot-stat">
                <span className="stat-label">{t('dashboard.coverage')}</span>
                <span className="stat-value">{robot?.coverage}%</span>
              </div>
              <div className="robot-stat">
                <span className="stat-label">{t('dashboard.battery')}</span>
                <span className="stat-value flex items-center gap-2">
                  <Battery size={16} className="text-primary"/> {robot?.battery}%
                </span>
              </div>
            </div>
            <div className="robot-activity mt-4">
              <span className="activity-label">{t('dashboard.currentActivity')}:</span>
              <p className="activity-text">{robotActivityText}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card quick-actions-card mt-6">
            <h3>{t('dashboard.quickActions')}</h3>
            <div className="actions-grid mt-4">
              <button className="btn btn-outline" onClick={() => navigate('/pest-disease')}>
                {t('dashboard.scanCrop')}
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/weather')}>
                {t('dashboard.checkWeather')}
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/yield-prediction')}>
                {t('dashboard.predictYield')}
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/agribot')}>
                {t('dashboard.askAgriBot')}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

