import { useEffect, useState } from 'react';
import { getFarmProfile } from '../services/api';
import { Bell, User, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import './Header.css';

interface HeaderProps {
  title: string;
  description: string;
}

export const Header = ({ title, description }: HeaderProps) => {
  const [profile, setProfile] = useState<any>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getFarmProfile();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  const farmName = language === 'mr' ? t('header.farmName') : (profile?.farmName || 'Sathyamangalam Farm');
  const cropDisplay = language === 'mr' ? `${t('crops.rice')} — ${t('stages.vegetative')}` : `${profile?.currentCrop || 'Rice'} — ${profile?.currentStage || 'Vegetative'}`;
  const connectionStatus = profile?.connectionStatus === 'Connected' ? t('common.connected') : profile?.connectionStatus;

  return (
    <header className="header">
      <div className="header-left">
        <h2 className="page-title">{title}</h2>
        <p className="page-description">{description}</p>
      </div>
      
      <div className="header-right">
        {profile && (
          <div className="farm-context">
            <div className="farm-info">
              <span className="farm-name">{farmName}</span>
              <div className="connection-status">
                <span className="status-dot"></span>
                <span>{connectionStatus}</span>
              </div>
            </div>
            <div className="farm-meta">
              <span>{cropDisplay}</span>
              <span className="last-updated">{t('header.lastUpdated')}: {profile.lastUpdated}</span>
            </div>
          </div>
        )}

        {/* Global Multilingual Switcher */}
        <div className="lang-switcher-container" title="Select Language / भाषा निवडा">
          <button 
            type="button"
            className={`lang-option-btn ${language === 'mr' ? 'active' : ''}`}
            onClick={() => setLanguage('mr')}
            aria-label="मराठी भाषा निवडा"
          >
            <Globe size={14} />
            <span>मराठी</span>
          </button>
          <button 
            type="button"
            className={`lang-option-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
            aria-label="Switch to English"
          >
            <span>English</span>
          </button>
        </div>
        
        <div className="header-actions">
          <button className="icon-btn" title={language === 'mr' ? 'सूचना' : 'Notifications'}>
            <Bell size={20} />
          </button>
          <button className="icon-btn" title={language === 'mr' ? 'शेतकरी प्रोफाइल' : 'Farmer Profile'}>
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

