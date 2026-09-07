import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Weather } from './pages/Weather';
import { PestDisease } from './pages/PestDisease';
import { YieldPrediction } from './pages/YieldPrediction';
import { CropPerformance } from './pages/CropPerformance';
import { MarketPrices } from './pages/MarketPrices';
import { FarmEconomics } from './pages/FarmEconomics';
import { PlantHealth } from './pages/PlantHealth';
import { AgriBot } from './pages/AgriBot';
import { FarmRobot } from './pages/FarmRobot';
import { SmartGuidance } from './pages/SmartGuidance';
import { Settings } from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="weather" element={<Weather />} />
        <Route path="pest-disease" element={<PestDisease />} />
        <Route path="yield-prediction" element={<YieldPrediction />} />
        <Route path="crop-performance" element={<CropPerformance />} />
        <Route path="market-prices" element={<MarketPrices />} />
        <Route path="farm-economics" element={<FarmEconomics />} />
        <Route path="plant-health" element={<PlantHealth />} />
        <Route path="agribot" element={<AgriBot />} />
        <Route path="farm-robot" element={<FarmRobot />} />
        <Route path="smart-guidance" element={<SmartGuidance />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
