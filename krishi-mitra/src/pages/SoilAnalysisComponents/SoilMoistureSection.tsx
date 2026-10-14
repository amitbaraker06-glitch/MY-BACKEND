import { Droplets, AlertTriangle, CheckCircle, AlertCircle, ArrowUp, ArrowDown, Droplets as Water } from 'lucide-react'
import { MetricCard } from '../../components/MetricCard'
import { LineChart } from '../../components/Charts'
import { mockSoilData } from '../../data'
import { getSoilMoistureStatus } from '../../utils/helpers'

export function SoilMoistureSection() {
  const soilData = mockSoilData
  const moistureStatus = getSoilMoistureStatus(soilData.moisture)
  const moistureHistory = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [58, 62, 65, 58, 62, 64, 62],
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-600" />
          Soil Moisture Analysis
        </h2>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${moistureStatus.bgColor} ${moistureStatus.color}`}>
          {moistureStatus.label === 'Low' && <ArrowDown className="w-4 h-4" />}
          {moistureStatus.label === 'Optimal' && <CheckCircle className="w-4 h-4" />}
          {moistureStatus.label === 'High' && <ArrowUp className="w-4 h-4" />}
          {moistureStatus.label}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard title="Current Moisture" value={soilData.moisture} unit="%" icon={<Droplets className="w-6 h-6 text-blue-600" />} color="blue" />
        <MetricCard title="Status" value={moistureStatus.label} icon={moistureStatus.label === 'Low' ? <AlertTriangle className="w-6 h-6 text-red-600" /> : moistureStatus.label === 'High' ? <AlertCircle className="w-6 h-6 text-blue-600" /> : <CheckCircle className="w-6 h-6 text-green-600" />} color={moistureStatus.label === 'Optimal' ? 'green' : moistureStatus.label === 'Low' ? 'red' : 'blue'} />
        <MetricCard title="Target Range" value="40-70" unit="%" icon={<Droplets className="w-6 h-6 text-green-600" />} color="green" />
      </div>

      <LineChart labels={moistureHistory.labels} data={moistureHistory.data} color="#06b6d4" />

      <div className="mt-4 p-4 bg-blue-50 rounded-xl">
        <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <Water className="w-5 h-5" />
          Irrigation Recommendation
        </h3>
        {moistureStatus.label === 'Low' && (
          <p className="text-blue-700">Soil moisture is critically low. <strong>Immediate irrigation required</strong>. Apply 30-40 mm water in early morning or late evening.</p>
        )}
        {moistureStatus.label === 'Optimal' && (
          <p className="text-blue-700">Soil moisture is in optimal range. <strong>No immediate irrigation needed</strong>. Monitor daily and irrigate if moisture drops below 40%.</p>
        )}
        {moistureStatus.label === 'High' && (
          <p className="text-blue-700">Soil moisture is high. <strong>Skip irrigation</strong> and ensure proper drainage. Excess moisture can cause root rot and fungal diseases.</p>
        )}
      </div>
    </div>
  )
}