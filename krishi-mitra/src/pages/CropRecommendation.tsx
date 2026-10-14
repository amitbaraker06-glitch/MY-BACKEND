import { useEffect, useState } from 'react'
import { Sprout, CheckCircle, AlertTriangle, XCircle, ArrowRight } from 'lucide-react'
import { getSuitabilityColor } from '../utils/helpers'
import { MetricCard } from '../components/MetricCard'
import { DoughnutChart } from '../components/Charts'
import { Link } from 'react-router-dom'
import { fetchRecommendations, fetchSoilData, fetchWeatherData } from '../services/api'

interface CropRecommendation {
  id: string
  name: string
  compatibility: number
  suitability: Record<string, string>
  reason: string
  expectedYield: string
  waterNeed: string
  duration: string
}

interface SoilData {
  moisture: number
  ph: number
  nitrogen: number
  phosphorus: number
  potassium: number
  healthScore: number
}

interface WeatherData {
  temperature: number
  humidity: number
  rainfall: number
  windSpeed: number
  condition: string
}

export default function CropRecommendation() {
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([])
  const [soilData, setSoilData] = useState<SoilData | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [recs, soil, weather] = await Promise.all([
          fetchRecommendations(),
          fetchSoilData(),
          fetchWeatherData(),
        ])
        setRecommendations(recs)
        setSoilData(soil)
        setWeatherData(weather)
      } catch (err) {
        setError('Failed to load recommendations')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent" />
        </div>
      </div>
    )
  }

  if (error || !soilData || !weatherData) {
    return (
      <div className="space-y-6">
        <div className="card text-center py-12">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Data</h3>
          <p className="text-gray-500 mb-4">{error || 'Failed to fetch recommendations from server'}</p>
        </div>
      </div>
    )
  }

  const topCrop = recommendations[0]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">AI Crop Recommendation</h1>
        <p className="text-gray-500 mt-1">
          Get personalized crop recommendations based on your soil, weather, and location data
        </p>
      </div>

      {/* Input Parameters Summary */}
      <div className="card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Sprout className="w-5 h-5 text-primary-600" />
          Analysis Parameters
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <MetricCard title="Soil Moisture" value={soilData.moisture} unit="%" icon={<Sprout className="w-5 h-5 text-blue-600" />} color="blue" />
          <MetricCard title="Soil pH" value={soilData.ph} icon={<Sprout className="w-5 h-5 text-purple-600" />} color="purple" />
          <MetricCard title="Nitrogen" value={soilData.nitrogen} unit="kg/ha" icon={<Sprout className="w-5 h-5 text-green-600" />} color="green" />
          <MetricCard title="Phosphorus" value={soilData.phosphorus} unit="kg/ha" icon={<Sprout className="w-5 h-5 text-blue-600" />} color="blue" />
          <MetricCard title="Potassium" value={soilData.potassium} unit="kg/ha" icon={<Sprout className="w-5 h-5 text-yellow-600" />} color="yellow" />
          <MetricCard title="Temperature" value={weatherData.temperature} unit="°C" icon={<Sprout className="w-5 h-5 text-orange-600" />} color="yellow" />
          <MetricCard title="Humidity" value={weatherData.humidity} unit="%" icon={<Sprout className="w-5 h-5 text-blue-600" />} color="blue" />
          <MetricCard title="Rainfall" value={weatherData.rainfall} unit="mm" icon={<Sprout className="w-5 h-5 text-cyan-600" />} color="blue" />
        </div>
      </div>

      {/* Top Recommendation Highlight */}
      <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">TOP RECOMMENDATION</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{topCrop.name}</h2>
            <p className="text-gray-600 mt-1">{topCrop.compatibility}% Compatibility with current conditions</p>
          </div>
          <div className="flex items-center gap-4">
            <DoughnutChart
              labels={['Compatibility', 'Remaining']}
              data={[topCrop.compatibility, 100 - topCrop.compatibility]}
              colors={['#16a34a', '#e5e7eb']}
              centerLabel={`${topCrop.compatibility}%`}
            />
            <Link to={"/crop-details/" + topCrop.id} className="btn-primary flex items-center gap-2">
              View Details
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Compatibility Breakdown */}
        <div className="mt-6 pt-6 border-t border-green-100">
          <h4 className="font-semibold text-gray-900 mb-3">Compatibility Analysis</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(topCrop.suitability).map(([key, value]) => {
              const suit = getSuitabilityColor(value as 'suitable' | 'moderate' | 'unsuitable')
              const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1'
              const colorClasses = suit.bgColor + ' ' + suit.color
              const iconColor = suit.label === 'Suitable' ? 'text-green-500' : suit.label === 'Moderate' ? 'text-yellow-500' : 'text-red-500'
              return (
                <span key={key} className={baseClasses + ' ' + colorClasses}>
                  <span className={iconColor}>
                    {suit.label === 'Suitable' && <CheckCircle className="w-3.5 h-3.5" />}
                    {suit.label === 'Moderate' && <AlertTriangle className="w-3.5 h-3.5" />}
                    {suit.label === 'Unsuitable' && <XCircle className="w-3.5 h-3.5" />}
                  </span>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {suit.label}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* All Recommended Crops */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">All Recommended Crops</h3>
        <div className="space-y-4">
          {recommendations.map((crop, index) => (
            <Link key={crop.id} to={"/crop-details/" + crop.id} className="block">
              <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100">
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: index === 0 ? '#16a34a' : index === 1 ? '#22c55e' : index === 2 ? '#4ade80' : '#86efac' }}>
                    #{index + 1}
                  </div>
                  
                  {/* Crop Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{crop.name}</p>
                        <p className="text-sm text-gray-500">{crop.compatibility}% Compatibility</p>
                      </div>
                      <span className="text-xl font-bold text-primary-600">{crop.compatibility}%</span>
                    </div>
                    
                    {/* Suitability Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {Object.entries(crop.suitability).map(([key, value]) => {
                        const suit = getSuitabilityColor(value as 'suitable' | 'moderate' | 'unsuitable')
                        const tagClasses = 'px-2 py-0.5 rounded-full text-xs font-medium ' + suit.bgColor + ' ' + suit.color
                        return (
                          <span key={key} className={tagClasses}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}: {suit.label}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Season & Location Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-green-600" />
            Current Season
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Kharif Season</p>
                  <p className="text-sm text-gray-500">June - October</p>
                </div>
              </div>
              <span className="status-badge status-good">Active</span>
            </div>
            <p className="text-sm text-gray-600">
              Current season is ideal for rice, maize, cotton, soybean, and other monsoon crops.
              Ensure proper drainage for heavy rainfall periods.
            </p>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-green-600" />
            Location: Maharashtra, India
          </h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-gray-900">22°C - 32°C</p>
                <p className="text-xs text-gray-500">Avg Temperature</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-gray-900">800-1200mm</p>
                <p className="text-xs text-gray-500">Annual Rainfall</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Tropical monsoon climate with distinct wet and dry seasons. 
              Suitable for diverse crop cultivation throughout the year.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}