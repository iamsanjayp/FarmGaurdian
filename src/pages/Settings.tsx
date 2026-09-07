import { useState } from 'react';
import { Header } from '../components/Header';
import { User, Globe, Bell, Mic, Sparkles, Server } from 'lucide-react';
import './Settings.css';

export const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'Guest Farmer',
    farmName: 'Sathyamangalam Farm',
    location: 'Sathyamangalam, Tamil Nadu',
    farmArea: '5 acres'
  });

  const [language, setLanguage] = useState('English');

  const [notifications, setNotifications] = useState({
    pest: true,
    weather: true,
    irrigation: true,
    fertilizer: false,
    market: true
  });

  const [voice, setVoice] = useState({
    assistant: true,
    tts: true,
    speed: 'Normal',
    language: 'English'
  });

  const [ai, setAi] = useState({
    recommendations: true,
    risk: true,
    personalized: true
  });

  const handleToggle = (setter: any, key: string, val: boolean) => {
    setter((prev: any) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="settings-page">
      <Header 
        title="Settings" 
        description="Manage your profile, preferences, and connections."
      />

      <div className="settings-grid">
        {/* Profile */}
        <div className="card settings-section">
          <div className="section-header">
            <User className="text-primary" size={20} />
            <h3>Profile</h3>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Farm Name</label>
            <input type="text" value={profile.farmName} onChange={e => setProfile({...profile, farmName: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Farm Area</label>
            <input type="text" value={profile.farmArea} onChange={e => setProfile({...profile, farmArea: e.target.value})} />
          </div>
          <button className="btn btn-primary mt-2">Save Profile</button>
        </div>

        {/* Language */}
        <div className="card settings-section">
          <div className="section-header">
            <Globe className="text-primary" size={20} />
            <h3>Language</h3>
          </div>
          <div className="form-group">
            <label>App Language</label>
            <select value={language} onChange={e => setLanguage(e.target.value)}>
              <option>English</option>
              <option>Tamil</option>
              <option>Hindi</option>
              <option>Marathi</option>
            </select>
          </div>
          <p className="text-sm text-text-secondary mt-2">Note: Multilingual support ensures accessibility for diverse regions.</p>
        </div>

        {/* Notifications */}
        <div className="card settings-section">
          <div className="section-header">
            <Bell className="text-primary" size={20} />
            <h3>Notifications</h3>
          </div>
          <div className="toggle-list">
            {Object.entries(notifications).map(([key, val]) => (
              <div key={key} className="toggle-item">
                <span className="capitalize">{key} Alerts</span>
                <label className="switch">
                  <input type="checkbox" checked={val} onChange={(e) => handleToggle(setNotifications, key, e.target.checked)} />
                  <span className="slider round"></span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Voice Assistant */}
        <div className="card settings-section">
          <div className="section-header">
            <Mic className="text-primary" size={20} />
            <h3>Voice Assistant</h3>
          </div>
          <div className="toggle-list mb-4">
            <div className="toggle-item">
              <span>Enable Voice Assistant</span>
              <label className="switch">
                <input type="checkbox" checked={voice.assistant} onChange={(e) => handleToggle(setVoice, 'assistant', e.target.checked)} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="toggle-item">
              <span>Text-to-Speech Output</span>
              <label className="switch">
                <input type="checkbox" checked={voice.tts} onChange={(e) => handleToggle(setVoice, 'tts', e.target.checked)} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Speech Speed</label>
            <select value={voice.speed} onChange={e => setVoice({...voice, speed: e.target.value})}>
              <option>Slow</option>
              <option>Normal</option>
              <option>Fast</option>
            </select>
          </div>
        </div>

        {/* AI Settings */}
        <div className="card settings-section">
          <div className="section-header">
            <Sparkles className="text-ai" size={20} />
            <h3>AI Settings</h3>
          </div>
          <div className="toggle-list">
            <div className="toggle-item">
              <span>AI Recommendations</span>
              <label className="switch">
                <input type="checkbox" checked={ai.recommendations} onChange={(e) => handleToggle(setAi, 'recommendations', e.target.checked)} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="toggle-item">
              <span>Risk Alerts (Proactive)</span>
              <label className="switch">
                <input type="checkbox" checked={ai.risk} onChange={(e) => handleToggle(setAi, 'risk', e.target.checked)} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="toggle-item">
              <span>Personalized Advice</span>
              <label className="switch">
                <input type="checkbox" checked={ai.personalized} onChange={(e) => handleToggle(setAi, 'personalized', e.target.checked)} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Device Settings */}
        <div className="card settings-section">
          <div className="section-header">
            <Server className="text-primary" size={20} />
            <h3>Device Connections</h3>
          </div>
          <div className="connection-list">
            <div className="connection-item">
              <div>
                <h4>IoT Sensors (ESP32)</h4>
                <span className="text-xs text-text-secondary">Last Sync: Just now</span>
              </div>
              <span className="badge badge-healthy">Connected</span>
            </div>
            <div className="connection-item">
              <div>
                <h4>Autonomous Farm Robot</h4>
                <span className="text-xs text-text-secondary">Status: Active in Zone B</span>
              </div>
              <span className="badge badge-healthy">Connected</span>
            </div>
            <div className="connection-item">
              <div>
                <h4>Weather API</h4>
                <span className="text-xs text-text-secondary">Source: Mock Data</span>
              </div>
              <span className="badge badge-healthy">Active</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
