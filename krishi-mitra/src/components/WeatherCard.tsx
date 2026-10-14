import { Cloud, Sun, Wind, Umbrella, Droplets } from 'lucide-react'
import { mockWeatherData } from '../data'

export function WeatherCard() {
  const weatherData = mockWeatherData
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Cloud className="w-5 h-5 text-blue-600" />
        Current Weather
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Cloud className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{weatherData.temperature}°C</p>
              <p className="text-sm text-gray-500 capitalize">{weatherData.condition}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <Droplets className="w-5 h-5 mx-auto text-blue-600 mb-1" />
            <p className="text-lg font-bold text-gray-900">{weatherData.humidity}%</p>
            <p className="text-xs text-gray-500">Humidity</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <Umbrella className="w-5 h-5 mx-auto text-blue-600 mb-1" />
            <p className="text-lg font-bold text-gray-900">{weatherData.rainfall} mm</p>
            <p className="text-xs text-gray-500">Rainfall</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <Wind className="w-5 h-5 mx-auto text-gray-600 mb-1" />
            <p className="text-lg font-bold text-gray-900">{weatherData.windSpeed} km/h</p>
            <p className="text-xs text-gray-500">Wind</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <Sun className="w-5 h-5 mx-auto text-yellow-600 mb-1" />
            <p className="text-lg font-bold text-gray-900">{weatherData.sunrise} / {weatherData.sunset}</p>
            <p className="text-xs text-gray-500">Sunrise/Sunset</p>
          </div>
        </div>
      </div>
    </div>
  )
}