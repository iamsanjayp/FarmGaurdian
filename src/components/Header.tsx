import { useEffect, useState } from 'react';
import { getFarmProfile } from '../services/api';
import { Bell, User } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  title: string;
  description: string;
}

export const Header = ({ title, description }: HeaderProps) => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getFarmProfile();
      setProfile(data);
    };
    fetchProfile();
  }, []);

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
              <span className="farm-name">{profile.farmName}</span>
              <div className="connection-status">
                <span className="status-dot"></span>
                <span>{profile.connectionStatus}</span>
              </div>
            </div>
            <div className="farm-meta">
              <span>{profile.currentCrop} — {profile.currentStage}</span>
              <span className="last-updated">Last updated: {profile.lastUpdated}</span>
            </div>
          </div>
        )}
        
        <div className="header-actions">
          <button className="icon-btn">
            <Bell size={20} />
          </button>
          <button className="icon-btn">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};
