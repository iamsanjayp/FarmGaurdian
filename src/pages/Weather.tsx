import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { getWeatherData } from '../services/api';
import { CloudRain, Wind, Droplets, Sun, Cloud, AlertCircle } from 'lucide-react';
import './Weather.css';

export const Weather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const wData = await getWeatherData();
      setWeather(wData);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="loading-state">Loading weather data...</div>;
  }

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('Rain')) return <CloudRain size={24} className="text-water" />;
    if (condition.includes('Cloud')) return <Cloud size={24} className="text-text-secondary" />;
    return <Sun size={24} className="text-warning" />;
  };

  return (
    <div className="weather-page">
      <Header 
        title="Farm Weather & Forecast" 
        description="Detailed weather insights for Sathyamangalam"
      />

      <div className="grid grid-cols-3 gap-6 mobile-col-1">
        {/* Main Current Weather */}
        <div className="card current-weather-card col-span-2">
          <div className="weather-main-info">
            <div className="weather-temp">
              <span className="temp-value">{weather?.current.temp}°</span>
              <span className="temp-unit">C</span>
            </div>
            <div className="weather-condition">
              {getWeatherIcon(weather?.current.condition)}
              <span>{weather?.current.condition}</span>
            </div>
          </div>
          
          <div className="weather-details grid grid-cols-3 gap-4 mt-6">
            <div className="detail-item">
              <Droplets className="text-water" size={20} />
              <div className="detail-text">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weather?.current.humidity}%</span>
              </div>
            </div>
            <div className="detail-item">
              <Wind className="text-text-secondary" size={20} />
              <div className="detail-text">
                <span className="detail-label">Wind</span>
                <span className="detail-value">{weather?.current.windSpeed}</span>
              </div>
            </div>
            <div className="detail-item">
              <CloudRain className="text-water" size={20} />
              <div className="detail-text">
                <span className="detail-label">Rain Prob</span>
                <span className="detail-value">{weather?.current.rainProb}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ag Recommendation */}
        <div className="card ag-recommendation-card">
          <div className="card-header">
            <h3>Agriculture Advice</h3>
            <AlertCircle className="text-primary" />
          </div>
          <p className="ag-rec-text mt-4">{weather?.recommendation}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6 mobile-col-1">
        {/* Forecast */}
        <div className="card">
          <h3>5-Day Forecast</h3>
          <div className="forecast-list mt-4">
            {weather?.forecast.map((day: any, idx: number) => (
              <div key={idx} className="forecast-item">
                <span className="forecast-day">{day.day}</span>
                <div className="forecast-condition">
                  {getWeatherIcon(day.condition)}
                  <span className="forecast-rain-prob">{day.rainProb}</span>
                </div>
                <span className="forecast-temp">{day.temp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Irrigation Suitability */}
        <div className="card">
          <h3>Irrigation Suitability</h3>
          <div className="irrigation-list mt-4">
            <div className="irrigation-item">
              <div className="irrigation-header">
                <span className="irrigation-day">TODAY</span>
                <span className={`badge badge-warning`}>{weather?.irrigationSuitability.today.status}</span>
              </div>
              <p className="irrigation-reason">{weather?.irrigationSuitability.today.reason}</p>
            </div>
            
            <div className="irrigation-item">
              <div className="irrigation-header">
                <span className="irrigation-day">TOMORROW</span>
                <span className={`badge badge-critical`}>{weather?.irrigationSuitability.tomorrow.status}</span>
              </div>
              <p className="irrigation-reason">{weather?.irrigationSuitability.tomorrow.reason}</p>
            </div>
            
            <div className="irrigation-item">
              <div className="irrigation-header">
                <span className="irrigation-day">DAY AFTER</span>
                <span className={`badge badge-healthy`}>{weather?.irrigationSuitability.dayAfter.status}</span>
              </div>
              <p className="irrigation-reason">{weather?.irrigationSuitability.dayAfter.reason}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
