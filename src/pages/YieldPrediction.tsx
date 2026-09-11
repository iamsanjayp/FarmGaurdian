import { useState } from 'react';
import { Header } from '../components/Header';
import { predictYield } from '../services/api';
import { TrendingUp, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from '../i18n/LanguageContext';
import './YieldPrediction.css';

export const YieldPrediction = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const { language, t } = useLanguage();
  const isMr = language === 'mr';

  // Form State
  const [crop, setCrop] = useState('Rice');
  const [area, setArea] = useState('5');
  const [soil, setSoil] = useState('Loamy');
  const [stage, setStage] = useState('Vegetative');
  const [sowingDate, setSowingDate] = useState('2026-04-10');

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = await predictYield({ crop, area, soil, stage, sowing_date: sowingDate });
    setResult(data);
    setLoading(false);
  };

  const chartData = result ? [
    { name: isMr ? 'किमान (Worst)' : 'Worst Case', yield: result.worstCase, color: '#f97316' }, // Warning
    { name: isMr ? 'अपेक्षित (Expected)' : 'Expected', yield: result.expectedYield, color: '#16a34a' }, // Primary
    { name: isMr ? 'कमाल (Best)' : 'Best Case', yield: result.bestCase, color: '#22c55e' } // Healthy
  ] : [];

  return (
    <div className="yield-prediction-page">
      <Header 
        title={t('yieldPrediction.title')} 
        description={t('yieldPrediction.description')}
      />

      <div className="grid grid-cols-3 gap-6 mobile-col-1">
        
        {/* Input Form */}
        <div className="card form-card col-span-1">
          <h3>{t('yieldPrediction.parameters')}</h3>
          <form className="mt-4" onSubmit={handlePredict}>
            <div className="form-group">
              <label>{t('yieldPrediction.cropType')}</label>
              <select value={crop} onChange={e => setCrop(e.target.value)}>
                <option value="Rice">{isMr ? t('crops.rice') : 'Rice'}</option>
                <option value="Wheat">{isMr ? t('crops.wheat') : 'Wheat'}</option>
                <option value="Cotton">{isMr ? t('crops.cotton') : 'Cotton'}</option>
                <option value="Sugarcane">{isMr ? t('crops.sugarcane') : 'Sugarcane'}</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>{t('yieldPrediction.farmArea')}</label>
              <input type="number" value={area} onChange={e => setArea(e.target.value)} />
            </div>

            <div className="form-group">
              <label>{t('yieldPrediction.soilType')}</label>
              <select value={soil} onChange={e => setSoil(e.target.value)}>
                <option value="Loamy">{isMr ? 'पोयटा माती (Loamy)' : 'Loamy'}</option>
                <option value="Clay">{isMr ? 'काळी चिकणमाती (Clay)' : 'Clay'}</option>
                <option value="Sandy">{isMr ? 'रेताड माती (Sandy)' : 'Sandy'}</option>
                <option value="Silt">{isMr ? 'गाळाची माती (Silt)' : 'Silt'}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t('yieldPrediction.growthStage')}</label>
              <select value={stage} onChange={e => setStage(e.target.value)}>
                <option value="Sowing">{isMr ? t('stages.sowing') : 'Sowing'}</option>
                <option value="Vegetative">{isMr ? t('stages.vegetative') : 'Vegetative'}</option>
                <option value="Flowering">{isMr ? t('stages.flowering') : 'Flowering'}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{isMr ? 'पेरणीची तारीख' : 'Sowing Date'}</label>
              <input type="date" value={sowingDate} onChange={e => setSowingDate(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
              {loading ? (isMr ? 'अंदाज काढत आहे...' : 'Predicting...') : t('yieldPrediction.predictButton')}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="col-span-2 flex flex-col gap-6">
          {result ? (
            <>
              <div className="card result-highlight-card">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="result-label">{isMr ? 'एकूण अंदाजित उत्पादन' : 'EXPECTED YIELD'}</span>
                    <div className="expected-value text-primary">
                      {result.expectedYield.toLocaleString()} <span className="text-xl text-text-secondary">{isMr ? 'किलो (kg)' : 'kg'}</span>
                    </div>
                  </div>
                  <div className="confidence-badge flex flex-col items-end">
                    <span className="text-sm text-text-secondary">{isMr ? 'मॉडेल अचूकता' : 'Confidence'}</span>
                    <span className="text-xl font-bold text-ai">{result.confidence}%</span>
                  </div>
                </div>
                
                <div className="yield-metrics grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-color-border-light">
                  <div className="metric">
                    <span className="metric-label">{isMr ? 'उत्पादन / हेक्टर' : 'Yield per hectare'}</span>
                    <span className="metric-value">{result.yieldPerHectare.toLocaleString()} {isMr ? 'किलो/हेक्टर' : 'kg/ha'}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">{isMr ? 'किमान संभाव्य उत्पादन' : 'Worst-case Yield'}</span>
                    <span className="metric-value text-warning">{result.worstCase.toLocaleString()} {isMr ? 'किलो' : 'kg'}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">{isMr ? 'कमाल संभाव्य उत्पादन' : 'Best-case Yield'}</span>
                    <span className="metric-value text-healthy">{result.bestCase.toLocaleString()} {isMr ? 'किलो' : 'kg'}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mobile-col-1">
                <div className="card chart-card">
                  <h3>{isMr ? 'संभाव्य उत्पादन परिस्थिती' : 'Yield Scenario'}</h3>
                  <div className="chart-container mt-4" style={{ height: 250 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ fill: 'transparent' }} />
                        <Bar dataKey="yield" radius={[4, 4, 0, 0]}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="card factors-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="text-ai" size={20} />
                    <h3>{isMr ? 'उत्पादनावर परिणाम करणारे घटक' : 'Factors Affecting Prediction'}</h3>
                  </div>
                  <ul className="factors-list">
                    {(result.factors && result.factors.length > 0 ? result.factors : [
                      { name: isMr ? 'माती आरोग्य' : 'Soil condition', status: isMr ? 'इष्टतम' : 'Optimal', level: 'healthy' },
                      { name: isMr ? 'हवामान स्थिती' : 'Weather forecast', status: isMr ? 'अनुकूल' : 'Favorable', level: 'water' },
                      { name: isMr ? 'पिकाची वाढीची अवस्था' : 'Crop stage', status: isMr ? 'योग्य मार्गावर' : 'On Track', level: 'warning' },
                      { name: isMr ? 'मागील वर्षांचे सरासरी उत्पादन' : 'Historical yield', status: isMr ? 'चांगले' : 'High', level: 'healthy' },
                      { name: isMr ? 'सिंचन व्यवस्थापन' : 'Irrigation management', status: isMr ? 'लक्ष देण्याची गरज' : 'Needs attention', level: 'warning' }
                    ]).map((f: any, idx: number) => (
                      <li key={idx}>
                        <span className="factor-name">{f.name}</span>
                        <span className={`badge badge-${f.level || 'healthy'}`}>{f.status}</span>
                      </li>
                    ))}
                  </ul>
                  {result.agronomicInsight && (
                    <div className="mt-4 p-3 bg-bg-main rounded border border-border text-xs text-text-secondary">
                      💡 {result.agronomicInsight}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="card placeholder-result h-full flex flex-col items-center justify-center text-text-muted">
              <TrendingUp size={48} className="mb-4 text-border" />
              <h3>{isMr ? 'तपशील भरा आणि उत्पादन अंदाज बटणावर क्लिक करा' : 'Enter parameters and click Predict Yield'}</h3>
              <p>{isMr ? 'शेतातील सध्याच्या परिस्थितीनुसार AI द्वारे कापणीचा सविस्तर अंदाज मिळवा.' : 'See AI-driven harvest estimations based on your farm conditions.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

