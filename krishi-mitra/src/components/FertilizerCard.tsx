import { FlaskConical } from 'lucide-react'
import { mockFertilizerRecommendation } from '../data'

export function FertilizerCard() {
  const fertilizer = mockFertilizerRecommendation
  
  return (
    <div className="card border-l-4 border-purple-500">
      <div className="flex items-center gap-2 mb-3">
        <FlaskConical className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Fertilizer Recommendation</h3>
      </div>
      <p className="text-gray-700 mb-3"><strong>{fertilizer.nutrient} Deficiency Detected</strong></p>
      <div className="space-y-2 text-sm mb-3">
        <p><strong>Recommended:</strong> {fertilizer.fertilizer}</p>
        <p><strong>Quantity:</strong> {fertilizer.quantity}</p>
        <p><strong>Method:</strong> {fertilizer.method}</p>
        <p><strong>Timing:</strong> {fertilizer.timing}</p>
      </div>
      <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl">{fertilizer.warning}</p>
    </div>
  )
}