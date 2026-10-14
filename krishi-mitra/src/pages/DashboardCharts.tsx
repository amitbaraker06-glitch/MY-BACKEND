import { LineChart, BarChart, DoughnutChart } from '../components/Charts'
import { mockSoilData, mockWeatherData, mockCropRecommendations, mockIrrigationRecommendation } from '../data'

// Chart data
export const moistureHistory = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  data: [58, 62, 65, 58, 62, 64, 62],
}

export const npkData = {
  labels: ['Nitrogen', 'Phosphorus', 'Potassium'],
  data: [mockSoilData.nitrogen, mockSoilData.phosphorus, mockSoilData.potassium],
  colors: ['#16a34a', '#2563eb', '#f59e0b'],
}

export const tempData = {
  labels: mockWeatherData.forecast.map(f => f.day),
  data: mockWeatherData.forecast.map(f => f.high),
}

export const rainfallData = {
  labels: mockWeatherData.forecast.map(f => f.day),
  data: mockWeatherData.forecast.map(f => f.rainfall),
}

export const irrigationHistory = {
  labels: mockIrrigationRecommendation.history.map(h => h.date),
  data: mockIrrigationRecommendation.history.map(h => h.amount),
}

export const cropSuitability = {
  labels: mockCropRecommendations.slice(0, 3).map(c => c.name),
  data: mockCropRecommendations.slice(0, 3).map(c => c.compatibility),
  colors: ['#16a34a', '#22c55e', '#4ade80'],
}

export function SoilMoistureChart() {
  const soilData = mockSoilData
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Soil Moisture Trend (7 Days)</h3>
        <span className="text-sm text-gray-500">Current: {soilData.moisture}%</span>
      </div>
      <LineChart labels={moistureHistory.labels} data={moistureHistory.data} />
    </div>
  )
}

export function NPKChart() {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">NPK Levels (kg/ha)</h3>
      <BarChart labels={npkData.labels} data={npkData.data} colors={npkData.colors} />
      <div className="flex items-center justify-center gap-6 mt-4 text-sm">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500" /> Nitrogen</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500" /> Phosphorus</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-500" /> Potassium</span>
      </div>
    </div>
  )
}

export function RainfallChart() {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Rainfall Forecast (mm)</h3>
      <BarChart labels={rainfallData.labels} data={rainfallData.data} colors={['#06b6d4']} />
    </div>
  )
}

export function TemperatureChart() {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Temperature Forecast (°C)</h3>
      <LineChart labels={tempData.labels} data={tempData.data} color="#f59e0b" fill={false} />
    </div>
  )
}

export function CropSuitabilityChart() {
  const cropRecs = mockCropRecommendations
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Crop Suitability</h3>
      <DoughnutChart
        labels={cropSuitability.labels}
        data={cropSuitability.data}
        colors={cropSuitability.colors}
        centerLabel={`${cropRecs[0].name} ${cropRecs[0].compatibility}%`}
      />
      <div className="mt-4 space-y-2">
        {cropRecs.slice(0, 3).map((crop) => (
          <div key={crop.id} className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">{crop.name}</span>
            <span className="text-primary-600 font-bold">{crop.compatibility}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SoilHealthChart() {
  const soilData = mockSoilData
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Soil Health Score</h3>
      <DoughnutChart
        labels={['Score', 'Remaining']}
        data={[soilData.healthScore, 100 - soilData.healthScore]}
        colors={['#16a34a', '#e5e7eb']}
        centerLabel={`${soilData.healthScore}/100`}
      />
      <p className="text-center text-sm text-gray-500 mt-2">Good - Optimal conditions for most crops</p>
    </div>
  )
}

export function IrrigationHistoryChart() {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Irrigation History (mm)</h3>
      <BarChart labels={irrigationHistory.labels} data={irrigationHistory.data} colors={['#2563eb']} />
      <div className="flex items-center justify-center gap-4 mt-4 text-sm">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500" /> Auto</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500" /> Manual</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-400" /> Rain</span>
      </div>
    </div>
  )
}