import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { getCropPerformanceData } from '../services/api';
import { BarChart2, TrendingUp, TrendingDown, Award, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import './CropPerformance.css';

export const CropPerformance = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [crop, setCrop] = useState('Rice');

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
    return <div className="loading-state">Loading performance data...</div>;
  }

  return (
    <div className="crop-performance-page">
      <Header 
        title="Crop Performance" 
        description="Analyze historical yield trends and future forecasts."
      />

      <div className="filter-bar mb-6">
        <div className="form-group inline-form-group">
          <label>Select Crop</label>
          <select value={crop} onChange={e => setCrop(e.target.value)}>
            <option>Rice</option>
            <option>Wheat</option>
            <option>Cotton</option>
            <option>Sugarcane</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mobile-col-2">
        <div className="card stat-card">
          <div className="stat-icon bg-primary-light text-primary">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Average Growth</span>
            <span className="stat-value">+2.47% / yr</span>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon bg-healthy-light text-healthy" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
            <Award size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Best Year</span>
            <span className="stat-value">2024 (3,050 kg)</span>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon bg-critical-light text-critical">
            <TrendingDown size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Worst Year</span>
            <span className="stat-value">2015 (2,450 kg)</span>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon bg-water-light text-water">
            <BarChart2 size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Data Points</span>
            <span className="stat-value">10 Years</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6 mobile-col-1">
        <div className="card col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3>10-Year Yield Trend (kg/ha)</h3>
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
            <h3>Future Yield Forecast</h3>
            <div className="forecast-items mt-4">
              <div className="forecast-item">
                <span className="forecast-label">Next Year</span>
                <span className="forecast-value text-primary">3,125 kg/ha</span>
              </div>
              <div className="forecast-item">
                <span className="forecast-label">In 3 Years</span>
                <span className="forecast-value text-primary">3,282 kg/ha</span>
              </div>
              <div className="forecast-item">
                <span className="forecast-label">In 5 Years</span>
                <span className="forecast-value text-primary">3,446 kg/ha</span>
              </div>
            </div>
          </div>

          <div className="card ai-recommendation-card">
            <div className="card-header mb-2">
              <Zap className="text-ai" size={20} />
              <h3>AI Recommendation</h3>
            </div>
            <p className="mb-0 text-ai-dark">
              "{crop} shows stable historical growth and is recommended for the next season. The expected yield trend continues upward."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
