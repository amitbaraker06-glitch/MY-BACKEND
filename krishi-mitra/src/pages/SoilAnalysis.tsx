import { SoilHealthOverview, SoilMoistureSection, SoilPHSection, NPKSection, CropRecommendationsSection } from './SoilAnalysisComponents'

export default function SoilAnalysis() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Soil Analysis</h1>
        <p className="text-gray-500 mt-1">Detailed analysis of soil parameters for optimal crop growth</p>
      </div>

      <SoilHealthOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SoilMoistureSection />
          <SoilPHSection />
        </div>
        <NPKSection />
      </div>

      <CropRecommendationsSection />
    </div>
  )
}