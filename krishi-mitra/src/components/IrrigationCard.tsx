import { mockIrrigationRecommendation } from '../data'
import { getIrrigationStatusColor } from '../utils/helpers'

const irrigation = mockIrrigationRecommendation
const irrigationStatus = getIrrigationStatusColor(irrigation.status)

export function IrrigationCard() {
  return (
    <div className="card border-l-4 border-yellow-500">
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-2 rounded-xl ${irrigationStatus.bgColor}`}>
          <span className="text-xl">{irrigationStatus.icon}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Irrigation Status</h3>
      </div>
      <p className="text-gray-700 mb-3">{irrigation.message}</p>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500">Recommended Time</p>
          <p className="font-medium text-gray-900">{irrigation.recommendedTime}</p>
        </div>
        <div>
          <p className="text-gray-500">Water Quantity</p>
          <p className="font-medium text-gray-900">{irrigation.waterQuantity}</p>
        </div>
        <div>
          <p className="text-gray-500">Next Schedule</p>
          <p className="font-medium text-gray-900">{irrigation.nextSchedule}</p>
        </div>
        <div>
          <p className="text-gray-500">Moisture Target</p>
          <p className="font-medium text-gray-900">{irrigation.moistureTarget}%</p>
        </div>
      </div>
    </div>
  )
}