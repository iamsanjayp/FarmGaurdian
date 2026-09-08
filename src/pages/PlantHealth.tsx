import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { getSensorData } from '../services/api';
import { Sprout, AlertCircle, Droplets, Thermometer, CloudRain, PackageOpen } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import './PlantHealth.css';

export const PlantHealth = () => {
  const [sensors, setSensors] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [crop, setCrop] = useState('Rice');

  const { language, t } = useLanguage();
  const isMr = language === 'mr';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getSensorData();
      setSensors(res);
      setLoading(false);
    };
    fetchData();
  }, [crop]);

  if (loading) {
    return <div className="loading-state">{t('common.loading')}</div>;
  }

  const getStatusClass = (status: string) => {
    return status === 'Low' ? 'text-warning' : 'text-healthy';
  };

  const getStatusBg = (status: string) => {
    return status === 'Low' ? 'bg-warning' : 'bg-primary';
  };

  const translateStatus = (status: string) => {
    if (!isMr) return status;
    switch (status) {
      case 'Low': return t('common.low');
      case 'Optimal': return t('common.optimal');
      case 'Normal': return t('common.normal');
      case 'High': return t('common.high');
      default: return status;
    }
  };

  return (
    <div className="plant-health-page">
      <Header 
        title={t('plantHealth.title')} 
        description={t('plantHealth.description')}
      />

      <div className="filter-bar mb-6">
        <div className="form-group inline-form-group">
          <label>{t('plantHealth.selectCrop')}</label>
          <select value={crop} onChange={e => setCrop(e.target.value)}>
            <option value="Rice">{isMr ? t('crops.rice') : 'Rice'}</option>
            <option value="Wheat">{isMr ? t('crops.wheat') : 'Wheat'}</option>
            <option value="Maize">{isMr ? t('crops.maize') : 'Maize'}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mobile-col-1">
        {/* NPK Cards */}
        <div className="card npk-card border-t-4" style={{ borderTopColor: '#3b82f6' }}>
          <div className="npk-header">
            <span className="npk-title">{t('plantHealth.nitrogen')}</span>
            <span className={`badge ${sensors?.npk.n.status === 'Low' ? 'badge-warning' : 'badge-healthy'}`}>
              {translateStatus(sensors?.npk.n.status)}
            </span>
          </div>
          <div className="npk-value-container">
            <span className="npk-value">{sensors?.npk.n.value}</span>
            <span className="npk-unit">{sensors?.npk.n.unit}</span>
          </div>
        </div>

        <div className="card npk-card border-t-4" style={{ borderTopColor: '#10b981' }}>
          <div className="npk-header">
            <span className="npk-title">{t('plantHealth.phosphorus')}</span>
            <span className={`badge ${sensors?.npk.p.status === 'Low' ? 'badge-warning' : 'badge-healthy'}`}>
              {translateStatus(sensors?.npk.p.status)}
            </span>
          </div>
          <div className="npk-value-container">
            <span className="npk-value">{sensors?.npk.p.value}</span>
            <span className="npk-unit">{sensors?.npk.p.unit}</span>
          </div>
        </div>

        <div className="card npk-card border-t-4" style={{ borderTopColor: '#f59e0b' }}>
          <div className="npk-header">
            <span className="npk-title">{t('plantHealth.potassium')}</span>
            <span className={`badge ${sensors?.npk.k.status === 'Low' ? 'badge-warning' : 'badge-healthy'}`}>
              {translateStatus(sensors?.npk.k.status)}
            </span>
          </div>
          <div className="npk-value-container">
            <span className="npk-value">{sensors?.npk.k.value}</span>
            <span className="npk-unit">{sensors?.npk.k.unit}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6 mobile-col-1">
        <div className="col-span-2 flex flex-col gap-6">
          <div className="card">
            <h3>{isMr ? 'अन्नद्रव्य आरोग्य व प्रमाण आलेख' : 'Nutrient Health Visualization'}</h3>
            <div className="nutrient-bars mt-6">
              <div className="nutrient-bar-wrapper">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{isMr ? 'नायट्रोजन (Nitrogen)' : 'Nitrogen'}</span>
                  <span className={getStatusClass(sensors?.npk.n.status)}>{translateStatus(sensors?.npk.n.status)}</span>
                </div>
                <div className="bar-track">
                  <div className={`bar-fill ${getStatusBg(sensors?.npk.n.status)}`} style={{ width: '40%' }}></div>
                </div>
              </div>

              <div className="nutrient-bar-wrapper">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{isMr ? 'फॉस्फरस (Phosphorus)' : 'Phosphorus'}</span>
                  <span className={getStatusClass(sensors?.npk.p.status)}>{translateStatus(sensors?.npk.p.status)}</span>
                </div>
                <div className="bar-track">
                  <div className={`bar-fill ${getStatusBg(sensors?.npk.p.status)}`} style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="nutrient-bar-wrapper">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{isMr ? 'पोटॅश (Potassium)' : 'Potassium'}</span>
                  <span className={getStatusClass(sensors?.npk.k.status)}>{translateStatus(sensors?.npk.k.status)}</span>
                </div>
                <div className="bar-track">
                  <div className={`bar-fill ${getStatusBg(sensors?.npk.k.status)}`} style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="recommendation-box mt-6">
              <AlertCircle className="text-warning flex-shrink-0" size={24} />
              <p className="mb-0">
                {isMr 
                  ? 'नायट्रोजनचे प्रमाण इष्टतम मर्यादेपेक्षा कमी आहे. वाढीच्या अवस्थेत पिकावरील अन्नद्रव्यांचा ताण टाळण्यासाठी योग्य खतांचा हप्ता द्यावा.'
                  : 'Nitrogen is below the preferred range. Consider soil-test-based nitrogen management to avoid crop stress during the vegetative stage.'}
              </p>
            </div>
          </div>

          <div className="card fertilizer-card">
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="text-primary" size={24} />
              <h3>{isMr ? 'खत व्यवस्थापन शिफारस' : 'Fertilizer Recommendation'}</h3>
            </div>
            
            <div className="fertilizer-item">
              <div className="flex items-center gap-3">
                <div className="fertilizer-icon">
                  <PackageOpen size={20} className="text-primary-dark" />
                </div>
                <div>
                  <h4 className="mb-1 text-lg">{isMr ? 'युरिया (Urea)' : 'Urea'}</h4>
                  <span className="text-text-secondary text-sm">
                    {isMr ? 'नायट्रोजनची कमतरता भरून काढण्यासाठी' : 'To address Nitrogen deficiency'}
                  </span>
                </div>
              </div>
              <div className="fertilizer-amount">
                <span className="amount-value text-primary">{isMr ? '२० किलो' : '20 kg'}</span>
                <span className="amount-unit text-text-secondary text-sm">{isMr ? 'प्रति एकर' : 'per acre'}</span>
              </div>
            </div>
            
            <p className="text-xs text-text-muted mt-4 text-center">
              {isMr 
                ? '*ही कृषी AI मॉडेलवर आधारित शिफारस आहे. प्रत्यक्ष खत वापर स्थानिक माती परीक्षण अहवालानुसार करावा.'
                : '*Prototype recommendation. Do not use as a universally valid agronomic prescription.'}
            </p>
          </div>
        </div>

        {/* Environmental Context */}
        <div className="card env-context-card">
          <h3>{isMr ? 'पर्यावरण व वातावरण संदर्भ' : 'Environmental Context'}</h3>
          <p className="text-sm text-text-secondary mt-2 mb-4">
            {isMr ? 'अन्नद्रव्य शोषण आणि पिकाची वाढ वातावरणातील घटकांवर अवलंबून असते.' : 'Nutrient uptake depends on optimal environmental conditions.'}
          </p>

          <div className="env-metrics flex flex-col gap-4">
            <div className="env-metric-item">
              <div className="flex items-center gap-3">
                <Droplets className="text-water" size={20} />
                <span className="font-medium">{t('dashboard.soilMoisture')}</span>
              </div>
              <div className="text-right">
                <span className="block font-bold text-lg">{sensors?.soilMoisture.value}%</span>
                <span className="text-xs text-healthy">{translateStatus(sensors?.soilMoisture.status)}</span>
              </div>
            </div>

            <div className="env-metric-item">
              <div className="flex items-center gap-3">
                <Thermometer className="text-warning" size={20} />
                <span className="font-medium">{t('dashboard.temperature')}</span>
              </div>
              <div className="text-right">
                <span className="block font-bold text-lg">{sensors?.temperature.value}°C</span>
                <span className="text-xs text-healthy">{translateStatus(sensors?.temperature.status)}</span>
              </div>
            </div>

            <div className="env-metric-item">
              <div className="flex items-center gap-3">
                <CloudRain className="text-water" size={20} />
                <span className="font-medium">{t('dashboard.humidity')}</span>
              </div>
              <div className="text-right">
                <span className="block font-bold text-lg">{sensors?.humidity.value}%</span>
                <span className="text-xs text-healthy">{translateStatus(sensors?.humidity.status)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

