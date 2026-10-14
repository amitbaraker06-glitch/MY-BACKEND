import {
  Droplets,
  FlaskConical,
  Sun,
  Zap,
} from 'lucide-react'
import { MetricCard } from '../components/MetricCard'
import {
  WeatherCard,
  FieldInfoCard,
  IrrigationCard,
  FertilizerCard,
  PestAlertCard,
  AIRecommendationCard,
  QuickActionsCard,
} from '../components'
import {
  SoilMoistureChart,
  NPKChart,
  RainfallChart,
  TemperatureChart,
  CropSuitabilityChart,
  SoilHealthChart,
  IrrigationHistoryChart,
} from './DashboardCharts'
import { mockSoilData, mockWeatherData } from '../data'
import { getSoilMoistureStatus, getNutrientStatus } from '../utils/helpers'

export default function Dashboard() {
  const soilData = mockSoilData
  const weatherData = mockWeatherData

  const moistureStatus = getSoilMoistureStatus(soilData.moisture)
  const nitrogenStatus = getNutrientStatus(soilData.nitrogen, 40, 60)
  const phosphorusStatus = getNutrientStatus(soilData.phosphorus, 25, 40)
  const potassiumStatus = getNutrientStatus(soilData.potassium, 30, 50)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your farm's key metrics and AI recommendations</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="input-field w-auto px-4 py-2 text-sm" defaultValue="field-1">
            <option value="field-1">Field 01 - Paddy (2 acres)</option>
            <option value="field-2">Field 02 - Wheat (1.5 acres)</option>
          </select>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <MetricCard
          title="Soil Moisture"
          value={soilData.moisture}
          unit="%"
          icon={<Droplets className="w-6 h-6 text-green-600" />}
          status={moistureStatus.label === 'Optimal' ? 'good' : moistureStatus.label === 'Low' ? 'critical' : 'warning'}
          color="green"
        />
        <MetricCard
          title="Soil pH"
          value={soilData.ph}
          icon={<FlaskConical className="w-6 h-6 text-blue-600" />}
          status="good"
          color="blue"
        />
        <MetricCard
          title="Temperature"
          value={weatherData.temperature}
          unit="°C"
          icon={<Sun className="w-6 h-6 text-yellow-600" />}
          color="yellow"
        />
        <MetricCard
          title="Humidity"
          value={weatherData.humidity}
          unit="%"
          icon={<Droplets className="w-6 h-6 text-blue-600" />}
          color="blue"
        />
        <MetricCard
          title="Soil Health"
          value={soilData.healthScore}
          unit="/100"
          icon={<Zap className="w-6 h-6 text-purple-600" />}
          status="good"
          color="purple"
        />
      </div>

      {/* NPK Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Nitrogen (N)"
          value={soilData.nitrogen}
          unit="kg/ha"
          icon={<FlaskConical className="w-6 h-6 text-green-600" />}
          status={nitrogenStatus.label === 'Optimal' ? 'good' : 'warning'}
          color="green"
        />
        <MetricCard
          title="Phosphorus (P)"
          value={soilData.phosphorus}
          unit="kg/ha"
          icon={<FlaskConical className="w-6 h-6 text-blue-600" />}
          status={phosphorusStatus.label === 'Optimal' ? 'good' : 'warning'}
          color="blue"
        />
        <MetricCard
          title="Potassium (K)"
          value={soilData.potassium}
          unit="kg/ha"
          icon={<FlaskConical className="w-6 h-6 text-yellow-600" />}
          status={potassiumStatus.label === 'Optimal' ? 'good' : 'warning'}
          color="yellow"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          <SoilMoistureChart />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <NPKChart />
            <RainfallChart />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TemperatureChart />
            <CropSuitabilityChart />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SoilHealthChart />
            <IrrigationHistoryChart />
          </div>
        </div>

        {/* Right Column - Info Cards */}
        <div className="space-y-4">
          <WeatherCard />
          <FieldInfoCard />
          <IrrigationCard />
          <FertilizerCard />
          <PestAlertCard />
          <AIRecommendationCard />
          <QuickActionsCard />
        </div>
      </div>
    </div>
  )
}