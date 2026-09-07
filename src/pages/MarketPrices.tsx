import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { getMarketData } from '../services/api';
import { TrendingUp, TrendingDown, Minus, MapPin, Clock } from 'lucide-react';
import './MarketPrices.css';

export const MarketPrices = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stateFilter, setStateFilter] = useState('Tamil Nadu');
  const [cropFilter, setCropFilter] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getMarketData(cropFilter, stateFilter);
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [cropFilter, stateFilter]);

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp size={16} className="text-primary" />;
    if (trend === 'down') return <TrendingDown size={16} className="text-critical" />;
    return <Minus size={16} className="text-text-secondary" />;
  };

  const getTrendClass = (trend: string) => {
    if (trend === 'up') return 'text-primary bg-primary-light';
    if (trend === 'down') return 'text-critical bg-critical-light';
    return 'text-text-secondary bg-border-light';
  };

  return (
    <div className="market-prices-page">
      <Header 
        title="Market Prices" 
        description="Today's mandi rates for major crops across India."
      />

      <div className="filter-card card mb-6">
        <div className="filters-container">
          <div className="form-group inline-form-group">
            <label>State</label>
            <select value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
              <option>Tamil Nadu</option>
              <option>Karnataka</option>
              <option>Kerala</option>
              <option>Maharashtra</option>
              <option>Punjab</option>
              <option>Uttar Pradesh</option>
            </select>
          </div>
          <div className="form-group inline-form-group">
            <label>Crop</label>
            <select value={cropFilter} onChange={e => setCropFilter(e.target.value)}>
              <option>All</option>
              <option>Rice</option>
              <option>Wheat</option>
              <option>Cotton</option>
              <option>Tomato</option>
              <option>Onion</option>
              <option>Potato</option>
              <option>Soybean</option>
              <option>Maize</option>
              <option>Sugarcane</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">Loading market data...</div>
      ) : (
        <div className="grid grid-cols-3 gap-6 mobile-col-1">
          {data.map((item, idx) => (
            <div key={idx} className="card market-card">
              <div className="market-card-header">
                <h3>{item.crop}</h3>
                <div className={`trend-badge ${getTrendClass(item.trend)}`}>
                  {getTrendIcon(item.trend)}
                  <span>{item.change}</span>
                </div>
              </div>
              
              <div className="market-price-main mt-4">
                <span className="price-range">{item.priceRange}</span>
                <span className="price-unit">{item.unit}</span>
              </div>

              <div className="market-meta mt-6">
                <div className="meta-item">
                  <MapPin size={14} className="text-text-secondary" />
                  <span>Best Market: {stateFilter} APMC</span>
                </div>
                <div className="meta-item mt-1">
                  <Clock size={14} className="text-text-secondary" />
                  <span>Last updated: Today, 09:30 AM</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
