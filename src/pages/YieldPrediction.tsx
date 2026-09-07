import { useState } from 'react';
import { Header } from '../components/Header';
import { predictYield } from '../services/api';
import { TrendingUp, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './YieldPrediction.css';

export const YieldPrediction = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Form State
  const [crop, setCrop] = useState('Rice');
  const [area, setArea] = useState('5');
  const [soil, setSoil] = useState('Loamy');
  const [stage, setStage] = useState('Vegetative');

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = await predictYield({ crop, area, soil, stage });
    setResult(data);
    setLoading(false);
  };

  const chartData = result ? [
    { name: 'Worst Case', yield: result.worstCase, color: '#f97316' }, // Warning
    { name: 'Expected', yield: result.expectedYield, color: '#16a34a' }, // Primary
    { name: 'Best Case', yield: result.bestCase, color: '#22c55e' } // Healthy
  ] : [];

  return (
    <div className="yield-prediction-page">
      <Header 
        title="Yield Prediction" 
        description="Estimate your harvest based on current farm conditions."
      />

      <div className="grid grid-cols-3 gap-6 mobile-col-1">
        
        {/* Input Form */}
        <div className="card form-card col-span-1">
          <h3>Prediction Parameters</h3>
          <form className="mt-4" onSubmit={handlePredict}>
            <div className="form-group">
              <label>Crop Type</label>
              <select value={crop} onChange={e => setCrop(e.target.value)}>
                <option>Rice</option>
                <option>Wheat</option>
                <option>Cotton</option>
                <option>Sugarcane</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Farm Area (acres)</label>
              <input type="number" value={area} onChange={e => setArea(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Soil Type</label>
              <select value={soil} onChange={e => setSoil(e.target.value)}>
                <option>Loamy</option>
                <option>Clay</option>
                <option>Sandy</option>
                <option>Silt</option>
              </select>
            </div>

            <div className="form-group">
              <label>Crop Stage</label>
              <select value={stage} onChange={e => setStage(e.target.value)}>
                <option>Sowing</option>
                <option>Vegetative</option>
                <option>Flowering</option>
              </select>
            </div>

            <div className="form-group">
              <label>Sowing Date</label>
              <input type="date" defaultValue="2026-04-10" />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
              {loading ? 'Predicting...' : 'Predict Yield'}
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
                    <span className="result-label">EXPECTED YIELD</span>
                    <div className="expected-value text-primary">
                      {result.expectedYield.toLocaleString()} <span className="text-xl text-text-secondary">kg</span>
                    </div>
                  </div>
                  <div className="confidence-badge flex flex-col items-end">
                    <span className="text-sm text-text-secondary">Confidence</span>
                    <span className="text-xl font-bold text-ai">{result.confidence}%</span>
                  </div>
                </div>
                
                <div className="yield-metrics grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-color-border-light">
                  <div className="metric">
                    <span className="metric-label">Yield per hectare</span>
                    <span className="metric-value">{result.yieldPerHectare.toLocaleString()} kg/ha</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Worst-case Yield</span>
                    <span className="metric-value text-warning">{result.worstCase.toLocaleString()} kg</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Best-case Yield</span>
                    <span className="metric-value text-healthy">{result.bestCase.toLocaleString()} kg</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mobile-col-1">
                <div className="card chart-card">
                  <h3>Yield Scenario</h3>
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
                    <h3>Factors Affecting Prediction</h3>
                  </div>
                  <ul className="factors-list">
                    <li>
                      <span className="factor-name">Soil condition</span>
                      <span className="badge badge-healthy">Optimal</span>
                    </li>
                    <li>
                      <span className="factor-name">Weather</span>
                      <span className="badge badge-water">Favorable</span>
                    </li>
                    <li>
                      <span className="factor-name">Crop stage</span>
                      <span className="badge badge-warning">On Track</span>
                    </li>
                    <li>
                      <span className="factor-name">Historical yield</span>
                      <span className="badge badge-healthy">High</span>
                    </li>
                    <li>
                      <span className="factor-name">Irrigation</span>
                      <span className="badge badge-warning">Needs attention</span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="card placeholder-result h-full flex flex-col items-center justify-center text-text-muted">
              <TrendingUp size={48} className="mb-4 text-border" />
              <h3>Enter parameters and click Predict Yield</h3>
              <p>See AI-driven harvest estimations based on your farm conditions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
