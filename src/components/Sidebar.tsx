import { NavLink } from 'react-router-dom';
import { 
  Home, CloudRain, Bug, TrendingUp, BarChart2, 
  IndianRupee, MessageSquare, Sprout, Bot, Settings, Menu, X
} from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';

const navItems = [
  { path: '/', name: 'Dashboard', icon: Home },
  { path: '/weather', name: 'Weather', icon: CloudRain },
  { path: '/pest-disease', name: 'Pest & Diseases', icon: Bug },
  { path: '/yield-prediction', name: 'Yield Prediction', icon: TrendingUp },
  { path: '/crop-performance', name: 'Crop Performance', icon: BarChart2 },
  { path: '/market-prices', name: 'Market Prices', icon: IndianRupee },
  { path: '/farm-economics', name: 'Farm Economics', icon: BarChart2 },
  { path: '/plant-health', name: 'Plant Health', icon: Sprout },
  { path: '/agribot', name: 'AgriBot Assistant', icon: MessageSquare },
  { path: '/farm-robot', name: 'Farm Robot', icon: Bot },
  { path: '/smart-guidance', name: 'Smart Guidance', icon: Sprout },
  { path: '/settings', name: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};
