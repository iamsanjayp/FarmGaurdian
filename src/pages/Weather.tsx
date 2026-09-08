import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { getWeatherData } from '../services/api';
import { CloudRain, Wind, Droplets, Sun, Cloud, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import './Weather.css';

export const Weather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();
  const isMr = language === 'mr';

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
    return <div className="loading-state">{t('common.loading')}</div>;
  }

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('Rain')) return <CloudRain size={24} className="text-water" />;
    if (condition.includes('Cloud')) return <Cloud size={24} className="text-text-secondary" />;
    return <Sun size={24} className="text-warning" />;
  };

  const translateCondition = (cond: string) => {
    if (!isMr) return cond;
    if (cond.includes('Partly Cloudy')) return t('weather.partlyCloudy');
    if (cond.includes('Rain')) return t('weather.rainy');
    if (cond.includes('Cloud')) return t('weather.cloudy');
    if (cond.includes('Sunny')) return t('weather.sunny');
    return cond;
  };

  const translateDay = (day: string) => {
    if (!isMr) return day;
    switch (day) {
      case 'Today': return t('weather.today');
      case 'Tomorrow': return t('weather.tomorrow');
      case 'Wed': return t('weather.wed');
      case 'Thu': return t('weather.thu');
      case 'Fri': return t('weather.fri');
      default: return day;
    }
  };

  const translateSuitabilityStatus = (status: string) => {
    if (!isMr) return status;
    switch (status) {
      case 'Moderate': return t('weather.moderate');
      case 'Poor': return t('weather.poor');
      case 'Good': return t('weather.good');
      default: return status;
    }
  };

  const recommendationText = isMr
    ? 'उद्या पाऊस पडण्याची शक्यता जास्त आहे (८५%). त्यामुळे आज मोठे पाणी देणे पुढे ढकलावे.'
    : weather?.recommendation;

  return (
    <div className="weather-page">
      <Header 
        title={t('weather.title')} 
        description={isMr ? 'सत्यमंगलम शेतासाठी सविस्तर हवामान अंदाज व कृषी सल्ला' : weather?.description || 'Detailed weather insights for Sathyamangalam'}
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
              <span>{translateCondition(weather?.current.condition)}</span>
            </div>
          </div>
          
          <div className="weather-details grid grid-cols-3 gap-4 mt-6">
            <div className="detail-item">
              <Droplets className="text-water" size={20} />
              <div className="detail-text">
                <span className="detail-label">{t('weather.humidity')}</span>
                <span className="detail-value">{weather?.current.humidity}%</span>
              </div>
            </div>
            <div className="detail-item">
              <Wind className="text-text-secondary" size={20} />
              <div className="detail-text">
                <span className="detail-label">{t('weather.wind')}</span>
                <span className="detail-value">{weather?.current.windSpeed}</span>
              </div>
            </div>
            <div className="detail-item">
              <CloudRain className="text-water" size={20} />
              <div className="detail-text">
                <span className="detail-label">{t('weather.rainProb')}</span>
                <span className="detail-value">{weather?.current.rainProb}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ag Recommendation */}
        <div className="card ag-recommendation-card">
          <div className="card-header">
            <h3>{t('weather.agricultureAdvice')}</h3>
            <AlertCircle className="text-primary" />
          </div>
          <p className="ag-rec-text mt-4">{recommendationText}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6 mobile-col-1">
        {/* Forecast */}
        <div className="card">
          <h3>{t('weather.fiveDayForecast')}</h3>
          <div className="forecast-list mt-4">
            {weather?.forecast.map((day: any, idx: number) => (
              <div key={idx} className="forecast-item">
                <span className="forecast-day">{translateDay(day.day)}</span>
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
          <h3>{t('weather.irrigationSuitability')}</h3>
          <div className="irrigation-list mt-4">
            <div className="irrigation-item">
              <div className="irrigation-header">
                <span className="irrigation-day">{isMr ? 'आज' : 'TODAY'}</span>
                <span className={`badge badge-warning`}>
                  {translateSuitabilityStatus(weather?.irrigationSuitability.today.status)}
                </span>
              </div>
              <p className="irrigation-reason">
                {isMr ? 'मातीतील ओलावा किंचित कमी आहे.' : weather?.irrigationSuitability.today.reason}
              </p>
            </div>
            
            <div className="irrigation-item">
              <div className="irrigation-header">
                <span className="irrigation-day">{isMr ? 'उद्या' : 'TOMORROW'}</span>
                <span className={`badge badge-critical`}>
                  {translateSuitabilityStatus(weather?.irrigationSuitability.tomorrow.status)}
                </span>
              </div>
              <p className="irrigation-reason">
                {isMr ? 'पाऊस पडण्याची शक्यता जास्त आहे.' : weather?.irrigationSuitability.tomorrow.reason}
              </p>
            </div>
            
            <div className="irrigation-item">
              <div className="irrigation-header">
                <span className="irrigation-day">{isMr ? 'परवा' : 'DAY AFTER'}</span>
                <span className={`badge badge-healthy`}>
                  {translateSuitabilityStatus(weather?.irrigationSuitability.dayAfter.status)}
                </span>
              </div>
              <p className="irrigation-reason">
                {isMr ? 'पावसानंतर निरभ्र व अनुकूल हवामान.' : weather?.irrigationSuitability.dayAfter.reason}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

