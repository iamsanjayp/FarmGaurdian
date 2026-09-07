import { useState } from 'react';
import { Header } from '../components/Header';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Calculator, AlertCircle } from 'lucide-react';
import './FarmEconomics.css';

export const FarmEconomics = () => {
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
    { name: 'Seed', value: seedCost, color: '#f59e0b' },
    { name: 'Fertilizer', value: fertilizerCost, color: '#10b981' },
    { name: 'Labour', value: labourCost, color: '#3b82f6' },
    { name: 'Irrigation', value: irrigationCost, color: '#06b6d4' },
    { name: 'Pesticide', value: pesticideCost, color: '#ef4444' },
    { name: 'Other', value: otherCosts, color: '#8b5cf6' },
  ];

  return (
    <div className="farm-economics-page">
      <Header 
        title="Farm Economics" 
        description="Estimate expected profit and loss before cultivation."
      />

      <div className="grid grid-cols-3 gap-6 mobile-col-1">
        {/* Input Form */}
        <div className="card economics-form-card col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="text-primary" size={20} />
            <h3>Cost Calculator</h3>
          </div>
          
          <div className="form-scroll-area">
            <div className="form-section">
              <h4>Farm Details</h4>
              <div className="form-group">
                <label>Crop</label>
                <select value={crop} onChange={e => setCrop(e.target.value)}>
                  <option>Rice</option>
                  <option>Wheat</option>
                  <option>Cotton</option>
                </select>
              </div>
              <div className="form-group">
                <label>Farm Area (acres)</label>
                <input type="number" value={area} onChange={e => setArea(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Expected Yield (kg/acre)</label>
                <input type="number" value={yieldPerAcre} onChange={e => setYieldPerAcre(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Expected Price (₹/kg)</label>
                <input type="number" value={pricePerKg} onChange={e => setPricePerKg(Number(e.target.value))} />
              </div>
            </div>

            <div className="form-section mt-6">
              <h4>Estimated Costs (₹)</h4>
              <div className="form-group">
                <label>Seed Cost</label>
                <input type="number" value={seedCost} onChange={e => setSeedCost(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Fertilizer Cost</label>
                <input type="number" value={fertilizerCost} onChange={e => setFertilizerCost(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Labour Cost</label>
                <input type="number" value={labourCost} onChange={e => setLabourCost(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Irrigation Cost</label>
                <input type="number" value={irrigationCost} onChange={e => setIrrigationCost(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Pesticide Cost</label>
                <input type="number" value={pesticideCost} onChange={e => setPesticideCost(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Other Costs</label>
                <input type="number" value={otherCosts} onChange={e => setOtherCosts(Number(e.target.value))} />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6 mobile-col-1">
            <div className="card summary-card bg-primary-light border-primary">
              <span className="summary-label">EXPECTED REVENUE</span>
              <span className="summary-value text-primary-dark">₹{expectedRevenue.toLocaleString()}</span>
              <span className="summary-sub">Production: {expectedProduction.toLocaleString()} kg</span>
            </div>
            
            <div className="card summary-card bg-critical-light border-critical">
              <span className="summary-label">TOTAL COST</span>
              <span className="summary-value text-critical">₹{totalCost.toLocaleString()}</span>
              <span className="summary-sub">Across all categories</span>
            </div>
          </div>

          <div className="card profit-card">
            <div className="flex justify-between items-center border-b border-color-border-light pb-4 mb-4">
              <div>
                <span className="summary-label">EXPECTED PROFIT</span>
                <span className={`profit-value ${expectedProfit >= 0 ? 'text-healthy' : 'text-critical'}`}>
                  ₹{expectedProfit.toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                <span className="summary-label">PROFIT MARGIN</span>
                <span className={`margin-value ${expectedProfit >= 0 ? 'text-healthy' : 'text-critical'}`}>
                  {profitMargin.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mobile-col-1">
              <div className="chart-container" style={{ height: 250 }}>
                <h4 className="text-center text-sm text-text-secondary mb-2">Cost Breakdown</h4>
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
                    These are estimates and actual market conditions may vary. Weather, pest outbreaks, and mandi price fluctuations can significantly impact final profitability.
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
