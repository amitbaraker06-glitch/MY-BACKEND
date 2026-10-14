import { mockSoilData } from '../../data'

export function SoilHealthOverview() {
  const soilData = mockSoilData
  return (
    <div className="card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Overall Soil Health Score</h2>
          <p className="text-gray-600 mt-1">Based on moisture, pH, and NPK levels</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="#e5e7eb" strokeWidth="8" fill="none" />
              <circle
                cx="64" cy="64" r="58"
                stroke="#16a34a" strokeWidth="8" fill="none"
                strokeDasharray={`${soilData.healthScore / 100 * 364.4} 364.4`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{soilData.healthScore}</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-700">Good</p>
            <p className="text-sm text-gray-500">Optimal for most crops</p>
          </div>
        </div>
      </div>
    </div>
  )
}