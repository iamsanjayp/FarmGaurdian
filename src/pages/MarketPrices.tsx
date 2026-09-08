import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { getMarketData } from '../services/api';
import { TrendingUp, TrendingDown, Minus, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import './MarketPrices.css';

export const MarketPrices = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();
  const isMr = language === 'mr';

  const [stateFilter, setStateFilter] = useState(isMr ? 'Maharashtra' : 'Tamil Nadu');
  const [cropFilter, setCropFilter] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getMarketData(cropFilter, stateFilter);
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [cropFilter, stateFilter]);

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp size={16} className="text-primary" />;
    if (trend === 'down') return <TrendingDown size={16} className="text-critical" />;
    return <Minus size={16} className="text-text-secondary" />;
  };

  const getTrendClass = (trend: string) => {
    if (trend === 'up') return 'text-primary bg-primary-light';
    if (trend === 'down') return 'text-critical bg-critical-light';
    return 'text-text-secondary bg-border-light';
  };

  const translateCrop = (cropName: string) => {
    if (!isMr) return cropName;
    switch (cropName.toLowerCase()) {
      case 'rice': return t('crops.rice');
      case 'wheat': return t('crops.wheat');
      case 'cotton': return t('crops.cotton');
      case 'tomato': return t('crops.tomato');
      case 'onion': return t('crops.onion');
      case 'potato': return t('crops.potato');
      case 'soybean': return t('crops.soybean');
      case 'maize': return t('crops.maize');
      case 'sugarcane': return t('crops.sugarcane');
      default: return cropName;
    }
  };

  const translateState = (stateName: string) => {
    if (!isMr) return stateName;
    switch (stateName) {
      case 'Maharashtra': return 'महाराष्ट्र (Maharashtra)';
      case 'Tamil Nadu': return 'तमिळनाडू (Tamil Nadu)';
      case 'Karnataka': return 'कर्नाटक (Karnataka)';
      case 'Kerala': return 'केरळ (Kerala)';
      case 'Punjab': return 'पंजाब (Punjab)';
      case 'Uttar Pradesh': return 'उत्तर प्रदेश (Uttar Pradesh)';
      default: return stateName;
    }
  };

  return (
    <div className="market-prices-page">
      <Header 
        title={t('marketPrices.title')} 
        description={t('marketPrices.description')}
      />

      <div className="filter-card card mb-6">
        <div className="filters-container">
          <div className="form-group inline-form-group">
            <label>{t('marketPrices.filterState')}</label>
            <select value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
              <option value="Maharashtra">{translateState('Maharashtra')}</option>
              <option value="Tamil Nadu">{translateState('Tamil Nadu')}</option>
              <option value="Karnataka">{translateState('Karnataka')}</option>
              <option value="Kerala">{translateState('Kerala')}</option>
              <option value="Punjab">{translateState('Punjab')}</option>
              <option value="Uttar Pradesh">{translateState('Uttar Pradesh')}</option>
            </select>
          </div>
          <div className="form-group inline-form-group">
            <label>{t('marketPrices.filterCrop')}</label>
            <select value={cropFilter} onChange={e => setCropFilter(e.target.value)}>
              <option value="All">{t('common.all')}</option>
              <option value="Rice">{isMr ? t('crops.rice') : 'Rice'}</option>
              <option value="Wheat">{isMr ? t('crops.wheat') : 'Wheat'}</option>
              <option value="Cotton">{isMr ? t('crops.cotton') : 'Cotton'}</option>
              <option value="Tomato">{isMr ? t('crops.tomato') : 'Tomato'}</option>
              <option value="Onion">{isMr ? t('crops.onion') : 'Onion'}</option>
              <option value="Potato">{isMr ? t('crops.potato') : 'Potato'}</option>
              <option value="Soybean">{isMr ? t('crops.soybean') : 'Soybean'}</option>
              <option value="Maize">{isMr ? t('crops.maize') : 'Maize'}</option>
              <option value="Sugarcane">{isMr ? t('crops.sugarcane') : 'Sugarcane'}</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">{t('common.loading')}</div>
      ) : (
        <div className="grid grid-cols-3 gap-6 mobile-col-1">
          {data.map((item, idx) => (
            <div key={idx} className="card market-card">
              <div className="market-card-header">
                <h3>{translateCrop(item.crop)}</h3>
                <div className={`trend-badge ${getTrendClass(item.trend)}`}>
                  {getTrendIcon(item.trend)}
                  <span>{item.change}</span>
                </div>
              </div>
              
              <div className="market-price-main mt-4">
                <span className="price-range">{item.priceRange}</span>
                <span className="price-unit">{isMr ? t('common.perQuintal') : item.unit}</span>
              </div>

              <div className="market-meta mt-6">
                <div className="meta-item">
                  <MapPin size={14} className="text-text-secondary flex-shrink-0" />
                  <span>{isMr ? `प्रमुख कृषी बाजार: ${stateFilter} APMC` : `Best Market: ${stateFilter} APMC`}</span>
                </div>
                <div className="meta-item mt-1">
                  <Clock size={14} className="text-text-secondary flex-shrink-0" />
                  <span>{isMr ? 'शेवटचे अपडेट: आज, ०९:३० AM' : 'Last updated: Today, 09:30 AM'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

