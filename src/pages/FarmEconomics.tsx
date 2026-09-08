import { useState } from 'react';
import { Header } from '../components/Header';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Calculator, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import './FarmEconomics.css';

export const FarmEconomics = () => {
  const { language, t } = useLanguage();
  const isMr = language === 'mr';

  // Inputs
  const [crop, setCrop] = useState('Rice');
  const [area, setArea] = useState(5);
  const [yieldPerAcre, setYieldPerAcre] = useState(1160);
  const [pricePerKg, setPricePerKg] = useState(30);
  
  const [seedCost, setSeedCost] = useState(5000);
  const [fertilizerCost, setFertilizerCost] = useState(12000);
  const [labourCost, setLabourCost] = useState(35000);
  const [irrigationCost, setIrrigationCost] = useState(8000);
  const [pesticideCost, setPesticideCost] = useState(10500);
  const [otherCosts, setOtherCosts] = useState(21000);

  // Calculations
  const expectedProduction = area * yieldPerAcre;
  const expectedRevenue = expectedProduction * pricePerKg;
  
  const totalCost = seedCost + fertilizerCost + labourCost + irrigationCost + pesticideCost + otherCosts;
  const expectedProfit = expectedRevenue - totalCost;
  const profitMargin = (expectedProfit / expectedRevenue) * 100;

  const costData = [
    { name: isMr ? 'बियाणे (Seed)' : 'Seed', value: seedCost, color: '#f59e0b' },
    { name: isMr ? 'खते (Fertilizer)' : 'Fertilizer', value: fertilizerCost, color: '#10b981' },
    { name: isMr ? 'मजुरी (Labour)' : 'Labour', value: labourCost, color: '#3b82f6' },
    { name: isMr ? 'सिंचन (Irrigation)' : 'Irrigation', value: irrigationCost, color: '#06b6d4' },
    { name: isMr ? 'कीटकनाशके (Pesticide)' : 'Pesticide', value: pesticideCost, color: '#ef4444' },
    { name: isMr ? 'इतर खर्च (Other)' : 'Other', value: otherCosts, color: '#8b5cf6' },
  ];

  return (
    <div className="farm-economics-page">
      <Header 
        title={t('farmEconomics.title')} 
        description={t('farmEconomics.description')}
      />

      <div className="grid grid-cols-3 gap-6 mobile-col-1">
        {/* Input Form */}
        <div className="card economics-form-card col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="text-primary" size={20} />
            <h3>{t('farmEconomics.costCalculator')}</h3>
          </div>
          
          <div className="form-scroll-area">
            <div className="form-section">
              <h4>{t('farmEconomics.farmDetails')}</h4>
              <div className="form-group">
                <label>{isMr ? 'पीक' : 'Crop'}</label>
                <select value={crop} onChange={e => setCrop(e.target.value)}>
                  <option value="Rice">{isMr ? t('crops.rice') : 'Rice'}</option>
                  <option value="Wheat">{isMr ? t('crops.wheat') : 'Wheat'}</option>
                  <option value="Cotton">{isMr ? t('crops.cotton') : 'Cotton'}</option>
                </select>
              </div>
              <div className="form-group">
                <label>{t('farmEconomics.areaAcre')}</label>
                <input type="number" value={area} onChange={e => setArea(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>{t('farmEconomics.yieldPerAcre')}</label>
                <input type="number" value={yieldPerAcre} onChange={e => setYieldPerAcre(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>{t('farmEconomics.pricePerKg')}</label>
                <input type="number" value={pricePerKg} onChange={e => setPricePerKg(Number(e.target.value))} />
              </div>
            </div>

            <div className="form-section mt-6">
              <h4>{t('farmEconomics.inputCosts')}</h4>
              <div className="form-group">
                <label>{t('farmEconomics.seedCost')}</label>
                <input type="number" value={seedCost} onChange={e => setSeedCost(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>{t('farmEconomics.fertilizerCost')}</label>
                <input type="number" value={fertilizerCost} onChange={e => setFertilizerCost(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>{t('farmEconomics.labourCost')}</label>
                <input type="number" value={labourCost} onChange={e => setLabourCost(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>{t('farmEconomics.irrigationCost')}</label>
                <input type="number" value={irrigationCost} onChange={e => setIrrigationCost(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>{t('farmEconomics.pesticideCost')}</label>
                <input type="number" value={pesticideCost} onChange={e => setPesticideCost(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>{t('farmEconomics.otherCosts')}</label>
                <input type="number" value={otherCosts} onChange={e => setOtherCosts(Number(e.target.value))} />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6 mobile-col-1">
            <div className="card summary-card bg-primary-light border-primary">
              <span className="summary-label">{isMr ? 'एकूण अपेक्षित उत्पन्न' : 'EXPECTED REVENUE'}</span>
              <span className="summary-value text-primary-dark">₹{expectedRevenue.toLocaleString()}</span>
              <span className="summary-sub">{isMr ? `अपेक्षित उत्पादन: ${expectedProduction.toLocaleString()} किलो` : `Production: ${expectedProduction.toLocaleString()} kg`}</span>
            </div>
            
            <div className="card summary-card bg-critical-light border-critical">
              <span className="summary-label">{isMr ? 'एकूण झालेला खर्च' : 'TOTAL COST'}</span>
              <span className="summary-value text-critical">₹{totalCost.toLocaleString()}</span>
              <span className="summary-sub">{isMr ? 'सर्व मशागत व खत घटकांसह' : 'Across all categories'}</span>
            </div>
          </div>

          <div className="card profit-card">
            <div className="flex justify-between items-center border-b border-color-border-light pb-4 mb-4">
              <div>
                <span className="summary-label">{isMr ? 'अपेक्षित निव्वळ नफा' : 'EXPECTED PROFIT'}</span>
                <div className={`profit-value ${expectedProfit >= 0 ? 'text-healthy' : 'text-critical'}`}>
                  ₹{expectedProfit.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <span className="summary-label">{isMr ? 'नफ्याचे प्रमाण' : 'PROFIT MARGIN'}</span>
                <div className={`margin-value ${expectedProfit >= 0 ? 'text-healthy' : 'text-critical'}`}>
                  {profitMargin.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mobile-col-1">
              <div className="chart-container" style={{ height: 250 }}>
                <h4 className="text-center text-sm text-text-secondary mb-2">{isMr ? 'खर्च विभागणी आलेख' : 'Cost Breakdown'}</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {costData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value: any) => `₹${value.toLocaleString()}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col justify-center">
                <div className="disclaimer-box flex gap-3 p-4 bg-bg-main rounded-lg border border-border">
                  <AlertCircle className="text-warning flex-shrink-0" size={24} />
                  <p className="text-sm text-text-secondary mb-0">
                    {isMr 
                      ? 'हे अंदाजित आकडे आहेत. हवामानातील अचानक बदल, कीड प्रादुर्भाव आणि स्थानिक बाजारपेठेतील भावातील चढउतार यामुळे प्रत्यक्ष नफ्यात बदल होऊ शकतो.'
                      : 'These are estimates and actual market conditions may vary. Weather, pest outbreaks, and mandi price fluctuations can significantly impact final profitability.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

