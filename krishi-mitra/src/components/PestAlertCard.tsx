import { AlertTriangle } from 'lucide-react'
import { mockPestDiseaseAlert } from '../data'
import { getRiskLevelColor } from '../utils/helpers'

const pestAlert = mockPestDiseaseAlert
const riskLevel = getRiskLevelColor(pestAlert.riskLevel)

export function PestAlertCard() {
  return (
    <div className="card border-l-4 border-red-500">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <h3 className="text-lg font-semibold text-gray-900">Pest & Disease Alert</h3>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span className="font-medium text-gray-900">{pestAlert.name}</span>
        <span className={`status-badge ${riskLevel.bgColor} ${riskLevel.color}`}>{pestAlert.riskLevel}</span>
      </div>
      <p className="text-sm text-gray-600 mb-2">Key Symptoms:</p>
      <ul className="text-sm text-gray-600 space-y-1 pl-4">
        {pestAlert.symptoms.slice(0, 3).map((symptom, i) => (
          <li key={i} className="flex items-center gap-1">
            <span className="text-red-500">•</span>
            {symptom}
          </li>
        ))}
      </ul>
      <a href="/pest-disease" className="text-sm text-primary-600 hover:text-primary-700 font-medium">View Details →</a>
    </div>
  )
}