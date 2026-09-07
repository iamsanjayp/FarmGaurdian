import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { getSensorData, getSmartAlerts, getCropProgress, getFarmProfile, getRobotData, getWeatherData } from '../services/api';
import { Droplets, Thermometer, CloudRain, Sprout, AlertTriangle, Activity, Battery, Check } from 'lucide-react';
import './Dashboard.css';

export const Dashboard = () => {
  const [sensors, setSensors] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [farm, setFarm] = useState<any>(null);
  const [robot, setRobot] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    return <div className="loading-state">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <Header 
        title="Good Morning, Farmer 👋" 
        description="Here's what's happening on your farm today."
      />

      <div className="dashboard-grid">
        {/* Main Column */}
        <div className="main-col">
          
          {/* Recommendation */}
          <div className="card recommendation-card">
            <div className="card-header">
              <h3>Today's Recommendation</h3>
              <Sprout className="text-primary" />
            </div>
            <p className="recommendation-text">{weather?.recommendation}</p>
          </div>

          {/* Sensors */}
          <h3 className="section-title mt-6">Live Farm Sensors</h3>
          <div className="sensor-grid">
            <div className="card sensor-card">
              <div className="sensor-header">
                <span className="sensor-title">SOIL MOISTURE</span>
                <Droplets className="text-water" size={20} />
              </div>
              <div className="sensor-value">{sensors?.soilMoisture.value}{sensors?.soilMoisture.unit}</div>
              <div className="badge badge-water mt-2">{sensors?.soilMoisture.status}</div>
            </div>
            <div className="card sensor-card">
              <div className="sensor-header">
                <span className="sensor-title">TEMPERATURE</span>
                <Thermometer className="text-warning" size={20} />
              </div>
              <div className="sensor-value">{sensors?.temperature.value}{sensors?.temperature.unit}</div>
              <div className="badge badge-healthy mt-2">{sensors?.temperature.status}</div>
            </div>
            <div className="card sensor-card">
              <div className="sensor-header">
                <span className="sensor-title">HUMIDITY</span>
                <CloudRain className="text-water" size={20} />
              </div>
              <div className="sensor-value">{sensors?.humidity.value}{sensors?.humidity.unit}</div>
              <div className="badge badge-healthy mt-2">{sensors?.humidity.status}</div>
            </div>
            <div className="card sensor-card">
              <div className="sensor-header">
                <span className="sensor-title">NPK</span>
                <Activity className="text-primary" size={20} />
              </div>
              <div className="sensor-value npk-values">
                <span>N: {sensors?.npk.n.value}</span>
                <span>P: {sensors?.npk.p.value}</span>
                <span>K: {sensors?.npk.k.value}</span>
              </div>
              <div className="badge badge-warning mt-2">N is Low</div>
            </div>
          </div>

          {/* Crop Progress & Overview */}
          <div className="grid grid-cols-2 mt-6 gap-6 mobile-col-1">
            <div className="card">
              <h3>Crop Progress</h3>
              <div className="progress-timeline mt-4">
                {progress.map((stage, idx) => (
                  <div key={idx} className={`timeline-item ${stage.completed ? 'completed' : ''} ${stage.current ? 'current' : ''}`}>
                    <div className="timeline-marker">
                      {stage.completed ? <Check size={14} /> : <div className="dot"></div>}
                    </div>
                    <div className="timeline-content">
                      <h4>{stage.stage}</h4>
                      {stage.current && <span className="timeline-meta">{stage.daysRemaining} days remaining</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card">
              <h3>Farm Overview</h3>
              <div className="overview-list mt-4">
                <div className="overview-item">
                  <span className="overview-label">Farm Area</span>
                  <span className="overview-value">{farm?.farmArea}</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">Current Crop</span>
                  <span className="overview-value">{farm?.currentCrop}</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">Sowing Date</span>
                  <span className="overview-value">{farm?.sowingDate}</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">Expected Harvest</span>
                  <span className="overview-value">{farm?.expectedHarvest}</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">Estimated Yield</span>
                  <span className="overview-value text-primary">~5,800 kg</span>
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
              <h3>Smart Alerts</h3>
              <AlertTriangle className="text-warning" size={20} />
            </div>
            <div className="alerts-list mt-4">
              {alerts.map((alert) => (
                <div key={alert.id} className={`alert-item alert-${alert.severity}`}>
                  <h4>{alert.type}</h4>
                  <p>{alert.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Robot Status */}
          <div className="card robot-card mt-6">
            <div className="card-header">
              <h3>Robot Status</h3>
              <div className="connection-status">
                <span className="status-dot"></span>
                <span>{robot?.status}</span>
              </div>
            </div>
            <div className="robot-stats mt-4">
              <div className="robot-stat">
                <span className="stat-label">Current Zone</span>
                <span className="stat-value">{robot?.currentZone}</span>
              </div>
              <div className="robot-stat">
                <span className="stat-label">Coverage</span>
                <span className="stat-value">{robot?.coverage}%</span>
              </div>
              <div className="robot-stat">
                <span className="stat-label">Battery</span>
                <span className="stat-value flex items-center gap-2">
                  <Battery size={16} className="text-primary"/> {robot?.battery}%
                </span>
              </div>
            </div>
            <div className="robot-activity mt-4">
              <span className="activity-label">Current activity:</span>
              <p className="activity-text">{robot?.activity}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card quick-actions-card mt-6">
            <h3>Quick Actions</h3>
            <div className="actions-grid mt-4">
              <button className="btn btn-outline">Scan Crop</button>
              <button className="btn btn-outline">Check Weather</button>
              <button className="btn btn-outline">Predict Yield</button>
              <button className="btn btn-outline">Ask AgriBot</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
