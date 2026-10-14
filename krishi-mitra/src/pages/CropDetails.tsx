import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  MapPin, Droplets, Sun, Calendar, FlaskConical,
  AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Sprout
} from 'lucide-react'
import { MetricCard } from '../components/MetricCard'
import { fetchCropDetails } from '../services/api'

interface CropDetails {
  id: string
  name: string
  suitableSoilType: string
  requiredPhRange: string
  requiredNpk: { n: number; p: number; k: number }
  waterRequirement: string
  suitableTemperature: string
  growingSeason: string
  expectedDuration: string
  irrigationRequirements: string
  fertilizerRequirements: string
  commonPestsDiseases: string[]
  preventionMethods: string[]
  cultivationGuidelines: string[]
}

export default function CropDetails() {
  const { cropId } = useParams()
  const [crop, setCrop] = useState<CropDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCrop() {
      try {
        setLoading(true)
        const data = await fetchCropDetails(cropId || 'paddy')
        setCrop(data)
      } catch (err) {
        setError('Failed to load crop details')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadCrop()
  }, [cropId])

  const [expandedSections, setExpandedSections] = useState<string[]>(['overview'])

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent" />
        </div>
      </div>
    )
  }

  if (error || !crop) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Crop Details</h1>
          <p className="text-gray-500 mt-1">Crop information not found</p>
        </div>
        <div className="card text-center py-12">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Crop Not Found</h3>
          <p className="text-gray-500 mb-4">{error || 'The requested crop details are not available.'}</p>
          <Link to="/crop-recommendation" className="btn-primary inline-flex items-center gap-2">
            <Sprout className="w-4 h-4" />
            Back to Recommendations
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link to="/crop-recommendation" className="text-sm text-primary-600 hover:text-primary-700 mb-2 inline-flex items-center gap-1">
            <Sprout className="w-4 h-4" />
            Back to Recommendations
          </Link>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{crop.name}</h1>
          <p className="text-gray-500 mt-1">Complete cultivation guide and requirements</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-xl font-medium text-sm">
            {crop.growingSeason}
          </span>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard title="Soil Type" value={crop.suitableSoilType} icon={<MapPin className="w-5 h-5 text-green-600" />} color="green" />
        <MetricCard title="pH Range" value={crop.requiredPhRange} icon={<FlaskConical className="w-5 h-5 text-purple-600" />} color="purple" />
        <MetricCard title="Water Need" value={crop.waterRequirement} icon={<Droplets className="w-5 h-5 text-blue-600" />} color="blue" />
        <MetricCard title="Temperature" value={crop.suitableTemperature} icon={<Sun className="w-5 h-5 text-yellow-600" />} color="yellow" />
        <MetricCard title="Duration" value={crop.expectedDuration} icon={<Calendar className="w-5 h-5 text-orange-600" />} color="yellow" />
        <MetricCard title="NPK Ratio" value={`${crop.requiredNpk.n}-${crop.requiredNpk.p}-${crop.requiredNpk.k}`} unit="kg/ha" icon={<FlaskConical className="w-5 h-5 text-red-600" />} color="red" />
      </div>

      {/* Detailed Sections */}
      <div className="space-y-4">
        {/* Overview */}
        <CollapsibleSection 
          title="Overview & Requirements" 
          icon={<Sprout className="w-5 h-5" />}
          isOpen={expandedSections.includes('overview')}
          onToggle={() => toggleSection('overview')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <InfoItem label="Suitable Soil Type" value={crop.suitableSoilType} icon={<MapPin className="w-4 h-4 text-green-600" />} />
              <InfoItem label="Required pH Range" value={crop.requiredPhRange} icon={<FlaskConical className="w-4 h-4 text-purple-600" />} />
              <InfoItem label="Water Requirement" value={crop.waterRequirement} icon={<Droplets className="w-4 h-4 text-blue-600" />} />
              <InfoItem label="Suitable Temperature" value={crop.suitableTemperature} icon={<Sun className="w-4 h-4 text-yellow-600" />} />
            </div>
            <div className="space-y-4">
              <InfoItem label="Growing Season" value={crop.growingSeason} icon={<Calendar className="w-4 h-4 text-orange-600" />} />
              <InfoItem label="Expected Duration" value={crop.expectedDuration} icon={<Calendar className="w-4 h-4 text-orange-600" />} />
              <div>
                <p className="text-sm text-gray-500">Required NPK (kg/ha)</p>
                <div className="flex gap-4 mt-1">
                  <div className="flex-1 p-3 bg-green-50 rounded-xl text-center">
                    <p className="text-2xl font-bold text-green-700">N: {crop.requiredNpk.n}</p>
                    <p className="text-xs text-gray-500">Nitrogen</p>
                  </div>
                  <div className="flex-1 p-3 bg-blue-50 rounded-xl text-center">
                    <p className="text-2xl font-bold text-blue-700">P: {crop.requiredNpk.p}</p>
                    <p className="text-xs text-gray-500">Phosphorus</p>
                  </div>
                  <div className="flex-1 p-3 bg-yellow-50 rounded-xl text-center">
                    <p className="text-2xl font-bold text-yellow-700">K: {crop.requiredNpk.k}</p>
                    <p className="text-xs text-gray-500">Potassium</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Irrigation Requirements */}
        <CollapsibleSection 
          title="Irrigation Requirements" 
          icon={<Droplets className="w-5 h-5" />}
          isOpen={expandedSections.includes('irrigation')}
          onToggle={() => toggleSection('irrigation')}
        >
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">{crop.irrigationRequirements}</p>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="font-medium text-blue-900 mb-1">Critical Stages</p>
              <p className="text-sm text-blue-700">Monitor soil moisture closely during these stages</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <p className="font-medium text-green-900 mb-1">Method</p>
              <p className="text-sm text-green-700">Flood / Drip / Sprinkler based on crop</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-xl">
              <p className="font-medium text-yellow-900 mb-1">Frequency</p>
              <p className="text-sm text-yellow-700">As per growth stage & weather</p>
            </div>
          </div>
        </CollapsibleSection>
{/* Fertilizer Requirements */}
        <CollapsibleSection 
          title="Fertilizer Requirements" 
          icon={<FlaskConical className="w-5 h-5" />}
          isOpen={expandedSections.includes('fertilizer')}
          onToggle={() => toggleSection('fertilizer')}
        >
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">{crop.fertilizerRequirements}</p>
          </div>
          <div className="mt-4 p-4 bg-purple-50 rounded-xl">
            <p className="font-medium text-purple-900 mb-2">Application Schedule</p>
            <ul className="text-sm text-purple-700 space-y-1 list-disc list-inside">
              <li>Basal dose at sowing/transplanting</li>
              <li>Top dressing at critical growth stages</li>
              <li>Foliar spray for micronutrients if needed</li>
            </ul>
          </div>
        </CollapsibleSection>

        {/* Pests & Diseases */}
        <CollapsibleSection 
          title="Common Pests & Diseases" 
          icon={<AlertTriangle className="w-5 h-5" />}
          isOpen={expandedSections.includes('pests')}
          onToggle={() => toggleSection('pests')}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Major Pests & Diseases</h4>
              <div className="flex flex-wrap gap-2">
                {crop.commonPestsDiseases.map((pest, i) => (
                  <span key={i} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm border border-red-100">
                    {pest}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Prevention Methods</h4>
              <ul className="space-y-1 list-disc list-inside text-gray-600">
                {crop.preventionMethods.map((method, i) => (
                  <li key={i} className="text-sm">{method}</li>
                ))}
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        {/* Cultivation Guidelines */}
        <CollapsibleSection 
          title="Cultivation Guidelines" 
          icon={<CheckCircle className="w-5 h-5" />}
          isOpen={expandedSections.includes('guidelines')}
          onToggle={() => toggleSection('guidelines')}
        >
          <ol className="space-y-3 list-decimal list-inside">
            {crop.cultivationGuidelines.map((guideline, i) => (
              <li key={i} className="text-gray-700 leading-relaxed pl-2">{guideline}</li>
            ))}
          </ol>
        </CollapsibleSection>
      </div>
    </div>
  )
}

// Helper Components
function InfoItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
      <div className="p-2 bg-white rounded-lg flex-shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  )
}

function CollapsibleSection({ 
  title, 
  icon, 
  isOpen, 
  onToggle, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode; 
  isOpen: boolean; 
  onToggle: () => void; 
  children: React.ReactNode 
}) {
  return (
    <div className="card">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 rounded-xl">{icon}</div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          {children}
        </div>
      )}
    </div>
  )
}