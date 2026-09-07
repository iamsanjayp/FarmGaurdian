import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { getRobotData } from '../services/api';
import { Bot, Battery, Play, Pause, Square, Home, ShieldAlert, Activity, Crosshair } from 'lucide-react';
import './FarmRobot.css';

export const FarmRobot = () => {
  const [robot, setRobot] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [robotPosition, setRobotPosition] = useState(10); // percentage along row

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getRobotData();
      setRobot(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Simulate robot movement
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setRobotPosition(prev => {
        if (prev >= 90) return 10;
        return prev + 5;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  if (loading) {
    return <div className="loading-state">Loading robot telemetry...</div>;
  }

  return (
    <div className="farm-robot-page">
      <Header 
        title="Farm Robot" 
        description="Live telemetry and autonomous crop monitoring."
      />

      <div className="grid grid-cols-3 gap-6 mobile-col-1">
        
        {/* Map and Controls */}
        <div className="col-span-2 flex flex-col gap-6">
          <div className="card map-card">
            <div className="card-header flex justify-between items-center mb-4">
              <h3>Live Robot Map</h3>
              <div className="connection-status">
                <span className={`status-dot ${isPlaying ? '' : 'paused'}`}></span>
                <span>{isPlaying ? 'ACTIVE' : 'PAUSED'}</span>
              </div>
            </div>

            <div className="farm-grid">
              {[1, 2, 3, 4, 5].map(row => (
                <div key={row} className="crop-row-container">
                  <div className="row-label">Row {row}</div>
                  <div className="crop-row">
                    <div className="plants"></div>
                    {row === robot.currentRow && (
                      <div 
                        className="robot-marker" 
                        style={{ left: `${robotPosition}%` }}
                      >
                        <Bot size={20} className="text-white" />
                        <div className="scan-beam"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="robot-controls mt-6">
              <button 
                className={`control-btn ${isPlaying ? 'active' : ''}`}
                onClick={() => setIsPlaying(true)}
              >
                <Play size={18} /> START
              </button>
              <button 
                className={`control-btn ${!isPlaying ? 'active-pause' : ''}`}
                onClick={() => setIsPlaying(false)}
              >
                <Pause size={18} /> PAUSE
              </button>
              <button className="control-btn stop-btn">
                <Square size={18} /> STOP
              </button>
              <button className="control-btn outline-btn">
                <Home size={18} /> RETURN
              </button>
            </div>
          </div>

          <div className="card stats-card">
            <div className="grid grid-cols-4 gap-4 mobile-col-2">
              <div className="robot-stat">
                <span className="stat-label">Current Zone</span>
                <span className="stat-value">{robot.currentZone}</span>
              </div>
              <div className="robot-stat">
                <span className="stat-label">Coverage</span>
                <span className="stat-value">{robot.coverage}%</span>
              </div>
              <div className="robot-stat">
                <span className="stat-label">Battery</span>
                <span className="stat-value flex items-center gap-1">
                  <Battery size={16} className="text-primary"/> {robot.battery}%
                </span>
              </div>
              <div className="robot-stat">
                <span className="stat-label">Speed</span>
                <span className="stat-value">{robot.speed} m/s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Detection & History */}
        <div className="flex flex-col gap-6">
          <div className="card live-detection-card">
            <div className="flex items-center gap-2 mb-4">
              <Crosshair className="text-critical" size={20} />
              <h3 className="text-critical">Live Detection</h3>
            </div>
            
            <div className="detection-alert">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="text-critical" size={18} />
                <span className="font-semibold">Possible Pest Activity</span>
              </div>
              <div className="detection-details text-sm">
                <div className="detail-row">
                  <span className="text-text-secondary">Location:</span>
                  <span className="font-medium">Zone B → Row 4 → Plant 17</span>
                </div>
                <div className="detail-row">
                  <span className="text-text-secondary">Confidence:</span>
                  <span className="font-medium">89%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card history-card flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="text-text-secondary" size={20} />
              <h3>Detection History</h3>
            </div>
            
            <div className="history-list">
              {robot.detectionHistory.map((item: any, idx: number) => (
                <div key={idx} className={`history-item ${item.alert ? 'alert' : ''}`}>
                  <span className="history-time">{item.time}</span>
                  <div className="history-info">
                    <span className="history-location">{item.location}</span>
                    <span className="history-status">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
