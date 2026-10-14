import { Sprout } from 'lucide-react'
import { mockCropRecommendations } from '../../data'
import { getSuitabilityColor } from '../../utils/helpers'

export function CropRecommendationsSection() {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Sprout className="w-5 h-5 text-green-600" />
        Recommended Crops for Current Soil
      </h2>
      <div className="space-y-3">
        {mockCropRecommendations.slice(0, 3).map((crop) => (
          <a key={crop.id} href={`/crop-details/${crop.id}`} className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{crop.name}</p>
                  <p className="text-sm text-gray-500">{crop.compatibility}% Compatibility</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-primary-600">{crop.compatibility}%</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {Object.entries(crop.suitability).map(([key, value]) => {
                const suit = getSuitabilityColor(value)
                return (
                  <span key={key} className={`px-2 py-1 rounded-full text-xs font-medium ${suit.bgColor} ${suit.color}`}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {suit.label}
                  </span>
                )
              })}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}