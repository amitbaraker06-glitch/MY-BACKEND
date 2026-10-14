import type { AIAdvisory } from './types'

export const mockAIAdvisory: AIAdvisory = {
  cropRecommendation: 'Paddy is the most suitable crop (94% compatibility) for current soil and weather conditions.',
  irrigationRecommendation: 'Light irrigation recommended before the next dry period. Current moisture at 62% is adequate.',
  fertilizerRecommendation: 'Potassium supplementation recommended. Apply MOP at 50 kg/ha during panicle initiation.',
  pestDiseaseAlerts: ['Brown Planthopper risk: Medium - Monitor field weekly', 'Leaf Blast: Low risk - Weather conditions moderately favorable'],
  soilHealthAnalysis: 'Soil health score: 82/100 (Good). pH 6.7 is optimal. Nitrogen and Phosphorus are adequate. Potassium is slightly low.',
  weatherAlerts: ['Heavy rainfall expected on Aug 23 - Ensure field drainage', 'Moderate humidity (72%) favors fungal diseases - Monitor closely'],
  summary: 'Your soil has moderate moisture, adequate phosphorus and low nitrogen. Weather conditions are favorable for maize. Light irrigation is recommended before the next dry period.',
}