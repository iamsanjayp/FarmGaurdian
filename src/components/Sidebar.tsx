import { NavLink } from 'react-router-dom';
import { 
  Home, CloudRain, Bug, TrendingUp, BarChart2, 
  IndianRupee, MessageSquare, Sprout, Bot, Settings, Menu, X
} from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './Sidebar.css';

interface NavDef {
  path: string;
  key: string;
  fallback: string;
  icon: any;
}

const navItems: NavDef[] = [
  { path: '/', key: 'dashboard', fallback: 'Dashboard', icon: Home },
  { path: '/weather', key: 'weather', fallback: 'Weather', icon: CloudRain },
  { path: '/pest-disease', key: 'pestDisease', fallback: 'Pest & Diseases', icon: Bug },
  { path: '/yield-prediction', key: 'yieldPrediction', fallback: 'Yield Prediction', icon: TrendingUp },
  { path: '/crop-performance', key: 'cropPerformance', fallback: 'Crop Performance', icon: BarChart2 },
  { path: '/market-prices', key: 'marketPrices', fallback: 'Market Prices', icon: IndianRupee },
  { path: '/farm-economics', key: 'farmEconomics', fallback: 'Farm Economics', icon: BarChart2 },
  { path: '/plant-health', key: 'plantHealth', fallback: 'Plant Health', icon: Sprout },
  { path: '/agribot', key: 'agribot', fallback: 'AgriBot Assistant', icon: MessageSquare },
  { path: '/farm-robot', key: 'farmRobot', fallback: 'Farm Robot', icon: Bot },
  { path: '/smart-guidance', key: 'smartGuidance', fallback: 'Smart Guidance', icon: Sprout },
  { path: '/settings', key: 'settings', fallback: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1 className="logo text-primary">AGRICARE</h1>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <item.icon size={20} className="nav-icon" />
              <span>{t(`nav.${item.key}`, item.fallback)}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

