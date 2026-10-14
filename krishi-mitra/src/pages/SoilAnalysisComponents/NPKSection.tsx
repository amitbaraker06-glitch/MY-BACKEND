import { FlaskConical } from 'lucide-react'
import { BarChart } from '../../components/Charts'
import { mockSoilData } from '../../data'
import { getNutrientStatus } from '../../utils/helpers'

export function NPKSection() {
  const soilData = mockSoilData
  const nitrogenStatus = getNutrientStatus(soilData.nitrogen, 40, 60)
  const phosphorusStatus = getNutrientStatus(soilData.phosphorus, 25, 40)
  const potassiumStatus = getNutrientStatus(soilData.potassium, 30, 50)

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FlaskConical className="w-5 h-5 text-orange-600" />
        NPK Nutrient Analysis
      </h2>

      <div className="space-y-4">
        {[
          { name: 'Nitrogen (N)', value: soilData.nitrogen, unit: 'kg/ha', optimal: '40-60', status: nitrogenStatus, icon: '🌱', color: 'green' as const },
          { name: 'Phosphorus (P)', value: soilData.phosphorus, unit: 'kg/ha', optimal: '25-40', status: phosphorusStatus, icon: '🌿', color: 'blue' as const },
          { name: 'Potassium (K)', value: soilData.potassium, unit: 'kg/ha', optimal: '30-50', status: potassiumStatus, icon: '🌾', color: 'yellow' as const },
        ].map((nutrient) => (
          <div key={nutrient.name} className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{nutrient.icon}</span>
                <div>
                  <p className="font-medium text-gray-900">{nutrient.name}</p>
                  <p className="text-sm text-gray-500">Optimal: {nutrient.optimal} {nutrient.unit}</p>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${nutrient.status.bgColor} ${nutrient.status.color}`}>
                {nutrient.status.icon} {nutrient.status.label}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    nutrient.status.label === 'Deficient' ? 'bg-red-500' :
                    nutrient.status.label === 'Excessive' ? 'bg-orange-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((nutrient.value / (parseInt(nutrient.optimal.split('-')[1]) * 1.5)) * 100, 100)}%` }}
                />
              </div>
              <span className="text-lg font-bold text-gray-900 w-20 text-right">{nutrient.value} {nutrient.unit}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {nutrient.status.label === 'Deficient' && `Deficiency detected. Consider applying ${nutrient.name.split(' ')[0]}-rich fertilizer.`}
              {nutrient.status.label === 'Optimal' && 'Nutrient level is optimal for crop growth.'}
              {nutrient.status.label === 'Excessive' && 'Excessive levels may cause nutrient imbalance. Reduce application.'}
            </p>
          </div>
        ))}

        <BarChart
          labels={['Nitrogen', 'Phosphorus', 'Potassium']}
          data={[soilData.nitrogen, soilData.phosphorus, soilData.potassium]}
          colors={['#16a34a', '#2563eb', '#f59e0b']}
        />
      </div>
    </div>
  )
}