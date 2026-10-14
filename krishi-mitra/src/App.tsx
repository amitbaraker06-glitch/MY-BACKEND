import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import SoilAnalysis from './pages/SoilAnalysis'
import CropRecommendation from './pages/CropRecommendation'
import CropDetails from './pages/CropDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="soil-analysis" element={<SoilAnalysis />} />
        <Route path="crop-recommendation" element={<CropRecommendation />} />
        <Route path="crop-details/:cropId" element={<CropDetails />} />
        <Route path="irrigation" element={<div className="p-6"><h1 className="text-2xl font-bold">Irrigation - Coming Soon</h1></div>} />
        <Route path="weather" element={<div className="p-6"><h1 className="text-2xl font-bold">Weather - Coming Soon</h1></div>} />
        <Route path="fertilizer" element={<div className="p-6"><h1 className="text-2xl font-bold">Fertilizer - Coming Soon</h1></div>} />
        <Route path="pest-disease" element={<div className="p-6"><h1 className="text-2xl font-bold">Pest & Disease - Coming Soon</h1></div>} />
        <Route path="ai-advisory" element={<div className="p-6"><h1 className="text-2xl font-bold">AI Advisory - Coming Soon</h1></div>} />
        <Route path="my-farm" element={<div className="p-6"><h1 className="text-2xl font-bold">My Farm - Coming Soon</h1></div>} />
        <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings - Coming Soon</h1></div>} />
      </Route>
    </Routes>
  )
}

export default App