import { FlaskConical, CheckCircle } from 'lucide-react'
import { MetricCard } from '../../components/MetricCard'
import { mockSoilData } from '../../data'
import { getPHClassification } from '../../utils/helpers'

export function SoilPHSection() {
  const soilData = mockSoilData
  const phClassification = getPHClassification(soilData.ph)

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-purple-600" />
          Soil pH Analysis
        </h2>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${phClassification.bgColor} ${phClassification.color}`}>
          {phClassification.label}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard title="Current pH" value={soilData.ph} icon={<FlaskConical className="w-6 h-6 text-purple-600" />} color="purple" />
        <MetricCard title="Classification" value={phClassification.label} icon={<FlaskConical className="w-6 h-6" />} color="purple" />
        <MetricCard title="Optimal Range" value="6.0-7.5" icon={<CheckCircle className="w-6 h-6 text-green-600" />} color="green" />
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Acidic</span>
          <span className="text-sm text-gray-500">Neutral</span>
          <span className="text-sm text-gray-500">Alkaline</span>
        </div>
        <div className="relative h-8">
          <div className="absolute inset-0 flex">
            <div className="w-1/3 bg-gradient-to-r from-red-500 to-yellow-500 rounded-l-xl" />
            <div className="w-1/3 bg-gradient-to-r from-yellow-500 to-green-500" />
            <div className="w-1/3 bg-gradient-to-r from-green-500 to-blue-500 rounded-r-xl" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex">
            <div className={`w-[${Math.min(Math.max((soilData.ph / 14) * 100, 0), 100)}%] h-full`}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white border-2 border-gray-900 rounded-full shadow-lg" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className="text-red-600">0</span>
          <span className="text-green-600">7</span>
          <span className="text-blue-600">14</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-purple-50 rounded-xl">
          <h3 className="font-semibold text-purple-900 mb-2">Suitable Crops for pH {soilData.ph}</h3>
          <ul className="text-sm text-purple-700 space-y-1">
            {phClassification.suitableCrops.map((crop, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                {crop}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-2">pH Management Tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {soilData.ph < 6.0 && (
              <>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" /> Apply agricultural lime to raise pH</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" /> Use wood ash as organic alternative</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" /> Avoid acidifying fertilizers (ammonium sulfate)</li>
              </>
            )}
            {soilData.ph > 7.5 && (
              <>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" /> Apply elemental sulfur to lower pH</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" /> Use acidifying fertilizers (ammonium sulfate)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" /> Add organic matter (compost, manure)</li>
              </>
            )}
            {(soilData.ph >= 6.0 && soilData.ph <= 7.5) && (
              <>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" /> pH is in optimal range - maintain current practices</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" /> Regular soil testing every 6 months</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" /> Use balanced fertilizers</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}