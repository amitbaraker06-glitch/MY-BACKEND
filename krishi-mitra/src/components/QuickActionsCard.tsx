import { Droplets, Sprout, Droplet, Cloud } from 'lucide-react'

export function QuickActionsCard() {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <a href="/soil-analysis" className="btn-secondary text-center py-4">
          <Droplets className="w-5 h-5 mx-auto mb-1" />
          <div className="text-sm">Soil Analysis</div>
        </a>
        <a href="/crop-recommendation" className="btn-secondary text-center py-4">
          <Sprout className="w-5 h-5 mx-auto mb-1" />
          <div className="text-sm">Crop Recommendation</div>
        </a>
        <a href="/irrigation" className="btn-secondary text-center py-4">
          <Droplet className="w-5 h-5 mx-auto mb-1" />
          <div className="text-sm">Irrigation Plan</div>
        </a>
        <a href="/weather" className="btn-secondary text-center py-4">
          <Cloud className="w-5 h-5 mx-auto mb-1" />
          <div className="text-sm">Weather Forecast</div>
        </a>
      </div>
    </div>
  )
}