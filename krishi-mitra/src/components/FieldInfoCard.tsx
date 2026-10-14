import { MapPin } from 'lucide-react'
import { mockFarmFields } from '../data'

export function FieldInfoCard() {
  const selectedField = mockFarmFields[0]
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-green-600" />
        Selected Field
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Field Name</span>
          <span className="font-medium text-gray-900">{selectedField.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Location</span>
          <span className="font-medium text-gray-900">{selectedField.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Area</span>
          <span className="font-medium text-gray-900">{selectedField.size} acres</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Soil Type</span>
          <span className="font-medium text-gray-900">{selectedField.soilType}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Current Crop</span>
          <span className="font-medium text-gray-900">{selectedField.currentCrop}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Growth Stage</span>
          <span className="font-medium text-gray-900">{selectedField.growthStage}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Sowing Date</span>
          <span className="font-medium text-gray-900">{selectedField.sowingDate}</span>
        </div>
      </div>
    </div>
  )
}