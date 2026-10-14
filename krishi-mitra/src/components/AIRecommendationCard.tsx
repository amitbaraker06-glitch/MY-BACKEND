import { Zap } from 'lucide-react'

export function AIRecommendationCard() {
  return (
    <div className="card bg-primary-50 border-primary-100">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 bg-primary-100 rounded-xl">
          <Zap className="w-5 h-5 text-primary-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Today's AI Recommendation</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Moisture level is currently adequate. No immediate irrigation is required. 
        Potassium is slightly low, so potassium supplementation may be considered based on crop 
        requirements and soil-test guidance. Weather conditions indicate moderate rainfall probability.
      </p>
    </div>
  )
}