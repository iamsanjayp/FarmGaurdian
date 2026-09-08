import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { getCropPerformanceData } from '../services/api';
import { BarChart2, TrendingUp, TrendingDown, Award, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useLanguage } from '../i18n/LanguageContext';
import './CropPerformance.css';

export const CropPerformance = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [crop, setCrop] = useState('Rice');

  const { language, t } = useLanguage();
  const isMr = language === 'mr';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getCropPerformanceData();
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [crop]);

  if (loading) {
    return <div className="loading-state">{t('common.loading')}</div>;
  }

  const cropDisplayName = isMr ? (crop === 'Rice' ? t('crops.rice') : crop === 'Wheat' ? t('crops.wheat') : crop === 'Cotton' ? t('crops.cotton') : t('crops.sugarcane')) : crop;

  return (
    <div className="crop-performance-page">
      <Header 
        title={t('cropPerformance.title')} 
        description={t('cropPerformance.description')}
      />

      <div className="filter-bar mb-6">
        <div className="form-group inline-form-group">
          <label>{t('cropPerformance.selectCrop')}</label>
          <select value={crop} onChange={e => setCrop(e.target.value)}>
            <option value="Rice">{isMr ? t('crops.rice') : 'Rice'}</option>
            <option value="Wheat">{isMr ? t('crops.wheat') : 'Wheat'}</option>
            <option value="Cotton">{isMr ? t('crops.cotton') : 'Cotton'}</option>
            <option value="Sugarcane">{isMr ? t('crops.sugarcane') : 'Sugarcane'}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mobile-col-2">
        <div className="card stat-card">
          <div className="stat-icon bg-primary-light text-primary">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">{t('cropPerformance.avgGrowth')}</span>
            <span className="stat-value">+2.47% {isMr ? '/ वर्ष' : '/ yr'}</span>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon bg-healthy-light text-healthy" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
            <Award size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">{isMr ? 'सर्वोत्तम वर्ष' : 'Best Year'}</span>
            <span className="stat-value">2024 (3,050 {isMr ? 'किलो' : 'kg'})</span>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon bg-critical-light text-critical">
            <TrendingDown size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">{isMr ? 'कमी उत्पादनाचे वर्ष' : 'Worst Year'}</span>
            <span className="stat-value">2015 (2,450 {isMr ? 'किलो' : 'kg'})</span>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon bg-water-light text-water">
            <BarChart2 size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">{isMr ? 'डेटा कालावधी' : 'Data Points'}</span>
            <span className="stat-value">{isMr ? '१० वर्षे' : '10 Years'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6 mobile-col-1">
        <div className="card col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3>{isMr ? '१० वर्षांचा उत्पादन कल (किलो/हेक्टर)' : '10-Year Yield Trend (kg/ha)'}</h3>
            <span className="badge badge-water">2015 → 2024</span>
          </div>
          <div className="chart-container" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#16a34a', fontWeight: 600 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="yield" 
                  stroke="#16a34a" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#16a34a', strokeWidth: 0 }}
                  activeDot={{ r: 6, stroke: '#dcfce7', strokeWidth: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="card forecast-card">
            <h3>{isMr ? 'भविष्यातील उत्पादन अंदाज' : 'Future Yield Forecast'}</h3>
            <div className="forecast-items mt-4">
              <div className="forecast-item">
                <span className="forecast-label">{isMr ? 'पुढील वर्ष' : 'Next Year'}</span>
                <span className="forecast-value text-primary">3,125 {isMr ? 'किलो/हेक्टर' : 'kg/ha'}</span>
              </div>
              <div className="forecast-item">
                <span className="forecast-label">{isMr ? '३ वर्षांनंतर' : 'In 3 Years'}</span>
                <span className="forecast-value text-primary">3,282 {isMr ? 'किलो/हेक्टर' : 'kg/ha'}</span>
              </div>
              <div className="forecast-item">
                <span className="forecast-label">{isMr ? '५ वर्षांनंतर' : 'In 5 Years'}</span>
                <span className="forecast-value text-primary">3,446 {isMr ? 'किलो/हेक्टर' : 'kg/ha'}</span>
              </div>
            </div>
          </div>

          <div className="card ai-recommendation-card">
            <div className="card-header mb-2">
              <Zap className="text-ai" size={20} />
              <h3>{isMr ? 'AI कृषी सल्ला' : 'AI Recommendation'}</h3>
            </div>
            <p className="mb-0 text-ai-dark">
              {isMr 
                ? `"${cropDisplayName} पिकात मागील काही वर्षांत स्थिर वाढ दिसून आली असून आगामी हंगामात लागवडीसाठी हे अनुकूल आहे."`
                : `"${crop} shows stable historical growth and is recommended for the next season. The expected yield trend continues upward."`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

