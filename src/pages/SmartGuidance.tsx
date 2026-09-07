import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { getSmartAlerts, getCropProgress, getWeatherData } from '../services/api';
import { Lightbulb, AlertTriangle, CloudRain, ShieldAlert, Sprout, Check } from 'lucide-react';
import './SmartGuidance.css';

export const SmartGuidance = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    return <div className="loading-state">Loading smart guidance...</div>;
  }

  const getAlertIcon = (type: string) => {
    if (type === 'Irrigation') return <CloudRain size={20} className="text-water" />;
    if (type === 'Pest') return <ShieldAlert size={20} className="text-critical" />;
    if (type === 'Fertilizer') return <Sprout size={20} className="text-primary" />;
    return <AlertTriangle size={20} className="text-warning" />;
  };

  return (
    <div className="smart-guidance-page">
      <Header 
        title="Smart Farming Guidance" 
        description="Real-time actionable insights for your crop."
      />

      <div className="filter-bar mb-6 flex gap-4 flex-wrap">
        <div className="form-group inline-form-group mb-0">
          <label>Crop</label>
          <select value={crop} onChange={e => setCrop(e.target.value)} style={{ width: '150px' }}>
            <option>Rice</option>
            <option>Wheat</option>
          </select>
        </div>
        <div className="form-group inline-form-group mb-0">
          <label>Sowing Date</label>
          <input type="date" value={sowingDate} onChange={e => setSowingDate(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mobile-col-1">
        
        {/* Left Column: Recommendations and Alerts */}
        <div className="col-span-1 flex flex-col gap-6">
          <div className="card recommendation-card shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="text-primary" size={24} />
              <h3 className="mb-0">Today's Recommendation</h3>
            </div>
            <p className="recommendation-text mb-0">
              "Irrigate today for 20 minutes and monitor nitrogen levels. {weather?.recommendation}"
            </p>
          </div>

          <div className="card alerts-container">
            <h3>Active Alerts</h3>
            <div className="alerts-list mt-4">
              {alerts.map((alert) => (
                <div key={alert.id} className={`guidance-alert-item alert-${alert.severity}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {getAlertIcon(alert.type)}
                    <h4>{alert.title}</h4>
                  </div>
                  <p>{alert.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Crop Lifecycle */}
        <div className="card col-span-2 lifecycle-card">
          <h3>Crop Lifecycle: {crop}</h3>
          
          <div className="lifecycle-stepper mt-8">
            {progress.map((stage, idx) => (
              <div key={idx} className={`step-item ${stage.completed ? 'completed' : ''} ${stage.current ? 'current' : ''}`}>
                <div className="step-marker">
                  {stage.completed ? <Check size={16} /> : <span>{idx + 1}</span>}
                </div>
                <div className="step-label">{stage.stage}</div>
              </div>
            ))}
            <div className="step-line"></div>
            <div className="step-line-active" style={{ width: '40%' }}></div>
          </div>

          <div className="current-stage-details mt-10 p-6 bg-bg-main rounded-lg border border-border">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-color-border-light">
              <div>
                <span className="text-sm text-text-secondary uppercase font-bold tracking-wide">Current Stage</span>
                <h2 className="text-primary-dark mt-1">Vegetative</h2>
              </div>
              <div className="text-right">
                <span className="text-sm text-text-secondary block">Timing</span>
                <span className="font-semibold text-lg">Day 15–45</span>
              </div>
            </div>

            <div className="stage-actions">
              <h4 className="mb-3 flex items-center gap-2">
                <Sprout size={18} className="text-primary" /> Recommended Actions:
              </h4>
              <ul className="action-checklist">
                <li>
                  <div className="checklist-box"></div>
                  <span>Maintain proper water level (2-3 cm)</span>
                </li>
                <li>
                  <div className="checklist-box"></div>
                  <span>Monitor soil moisture regularly</span>
                </li>
                <li>
                  <div className="checklist-box"></div>
                  <span>Apply recommended nitrogen top-dressing</span>
                </li>
                <li>
                  <div className="checklist-box"></div>
                  <span>Check for early pest activity (stem borer)</span>
                </li>
                <li>
                  <div className="checklist-box"></div>
                  <span>Weed management to reduce competition</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
