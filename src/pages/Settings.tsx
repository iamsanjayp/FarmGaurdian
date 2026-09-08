import { useState } from 'react';
import { Header } from '../components/Header';
import { User, Globe, Bell, Mic, Sparkles, Server } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import './Settings.css';

export const Settings = () => {
  const { language, setLanguage, t } = useLanguage();

  const [profile, setProfile] = useState({
    name: language === 'mr' ? 'अतिथी शेतकरी' : 'Guest Farmer',
    farmName: language === 'mr' ? 'सत्यमंगलम फार्म' : 'Sathyamangalam Farm',
    location: language === 'mr' ? 'सत्यमंगलम, महाराष्ट्र' : 'Sathyamangalam, Tamil Nadu',
    farmArea: language === 'mr' ? '५ एकर' : '5 acres'
  });

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
    language: language === 'mr' ? 'Marathi' : 'English'
  });

  const [ai, setAi] = useState({
    recommendations: true,
    risk: true,
    personalized: true
  });

  const handleToggle = (setter: any, key: string, val: boolean) => {
    setter((prev: any) => ({ ...prev, [key]: val }));
  };

  const handleLangChange = (val: string) => {
    if (val === 'Marathi' || val === 'mr') {
      setLanguage('mr');
    } else {
      setLanguage('en');
    }
  };

  const notificationLabels: Record<string, string> = {
    pest: t('settings.pestAlerts'),
    weather: t('settings.weatherAlerts'),
    irrigation: t('settings.irrigationAlerts'),
    fertilizer: t('settings.fertilizerAlerts'),
    market: t('settings.marketAlerts'),
  };

  return (
    <div className="settings-page">
      <Header 
        title={t('settings.title')} 
        description={t('settings.description')}
      />

      <div className="settings-grid">
        {/* Profile */}
        <div className="card settings-section">
          <div className="section-header">
            <User className="text-primary" size={20} />
            <h3>{t('settings.profile')}</h3>
          </div>
          <div className="form-group">
            <label>{t('settings.name')}</label>
            <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label>{t('settings.farmName')}</label>
            <input type="text" value={profile.farmName} onChange={e => setProfile({...profile, farmName: e.target.value})} />
          </div>
          <div className="form-group">
            <label>{t('settings.location')}</label>
            <input type="text" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} />
          </div>
          <div className="form-group">
            <label>{t('settings.farmArea')}</label>
            <input type="text" value={profile.farmArea} onChange={e => setProfile({...profile, farmArea: e.target.value})} />
          </div>
          <button className="btn btn-primary mt-2">{t('settings.saveProfile')}</button>
        </div>

        {/* Language */}
        <div className="card settings-section">
          <div className="section-header">
            <Globe className="text-primary" size={20} />
            <h3>{t('settings.language')}</h3>
          </div>
          <div className="form-group">
            <label>{t('settings.appLanguage')}</label>
            <select 
              value={language === 'mr' ? 'Marathi' : 'English'} 
              onChange={e => handleLangChange(e.target.value)}
              style={{ fontWeight: 600 }}
            >
              <option value="Marathi">मराठी (Marathi)</option>
              <option value="English">English (English)</option>
            </select>
          </div>
          <p className="text-sm text-text-secondary mt-2">{t('settings.langNote')}</p>
        </div>

        {/* Notifications */}
        <div className="card settings-section">
          <div className="section-header">
            <Bell className="text-primary" size={20} />
            <h3>{t('settings.notifications')}</h3>
          </div>
          <div className="toggle-list">
            {Object.entries(notifications).map(([key, val]) => (
              <div key={key} className="toggle-item">
                <span>{notificationLabels[key] || `${key} Alerts`}</span>
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
            <h3>{t('settings.voiceAssistant')}</h3>
          </div>
          <div className="toggle-list mb-4">
            <div className="toggle-item">
              <span>{t('settings.enableVoice')}</span>
              <label className="switch">
                <input type="checkbox" checked={voice.assistant} onChange={(e) => handleToggle(setVoice, 'assistant', e.target.checked)} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="toggle-item">
              <span>{t('settings.ttsOutput')}</span>
              <label className="switch">
                <input type="checkbox" checked={voice.tts} onChange={(e) => handleToggle(setVoice, 'tts', e.target.checked)} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>{t('settings.speechSpeed')}</label>
            <select value={voice.speed} onChange={e => setVoice({...voice, speed: e.target.value})}>
              <option value="Slow">{t('settings.slow')}</option>
              <option value="Normal">{t('settings.normal')}</option>
              <option value="Fast">{t('settings.fast')}</option>
            </select>
          </div>
        </div>

        {/* AI Settings */}
        <div className="card settings-section">
          <div className="section-header">
            <Sparkles className="text-ai" size={20} />
            <h3>{t('settings.aiSettings')}</h3>
          </div>
          <div className="toggle-list">
            <div className="toggle-item">
              <span>{t('settings.aiRecs')}</span>
              <label className="switch">
                <input type="checkbox" checked={ai.recommendations} onChange={(e) => handleToggle(setAi, 'recommendations', e.target.checked)} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="toggle-item">
              <span>{t('settings.riskAlerts')}</span>
              <label className="switch">
                <input type="checkbox" checked={ai.risk} onChange={(e) => handleToggle(setAi, 'risk', e.target.checked)} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="toggle-item">
              <span>{t('settings.personalizedAdvice')}</span>
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
            <h3>{t('settings.deviceConnections')}</h3>
          </div>
          <div className="connection-list">
            <div className="connection-item">
              <div>
                <h4>{t('settings.iotSensors')}</h4>
                <span className="text-xs text-text-secondary">{t('settings.lastSync')}</span>
              </div>
              <span className="badge badge-healthy">{t('common.connected')}</span>
            </div>
            <div className="connection-item">
              <div>
                <h4>{t('settings.autonomousRobot')}</h4>
                <span className="text-xs text-text-secondary">{t('settings.robotZoneStatus')}</span>
              </div>
              <span className="badge badge-healthy">{t('common.connected')}</span>
            </div>
            <div className="connection-item">
              <div>
                <h4>{t('settings.weatherApi')}</h4>
                <span className="text-xs text-text-secondary">{t('settings.mockDataSource')}</span>
              </div>
              <span className="badge badge-healthy">{t('common.active')}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

