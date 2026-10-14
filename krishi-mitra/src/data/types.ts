export interface FarmField {
  id: string
  name: string
  location: string
  size: number
  soilType: string
  currentCrop: string
  sowingDate: string
  growthStage: string
  soilHealth: string
  moisture: number
}

export interface SoilData {
  moisture: number
  ph: number
  nitrogen: number
  phosphorus: number
  potassium: number
  healthScore: number
}

export interface WeatherData {
  temperature: number
  humidity: number
  rainfall: number
  windSpeed: number
  condition: string
  sunrise: string
  sunset: string
  forecast: WeatherForecast[]
  alerts: WeatherAlert[]
}

export interface WeatherForecast {
  day: string
  date: string
  high: number
  low: number
  condition: string
  rainfall: number
  humidity: number
}

export interface WeatherAlert {
  type: 'heavy-rain' | 'drought' | 'high-temp' | 'strong-wind'
  severity: 'high' | 'medium' | 'low'
  message: string
}

export interface CropRecommendation {
  id: string
  name: string
  compatibility: number
  suitability: {
    ph: 'suitable' | 'moderate' | 'unsuitable'
    nitrogen: 'suitable' | 'moderate' | 'unsuitable'
    phosphorus: 'suitable' | 'moderate' | 'unsuitable'
    potassium: 'suitable' | 'moderate' | 'unsuitable'
    moisture: 'suitable' | 'moderate' | 'unsuitable'
    weather: 'suitable' | 'moderate' | 'unsuitable'
  }
}

export interface CropDetails {
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

export interface IrrigationRecommendation {
  status: 'none' | 'recommended' | 'urgent'
  message: string
  recommendedTime: string
  waterQuantity: string
  nextSchedule: string
  moistureTarget: number
  history: IrrigationHistory[]
}

export interface IrrigationHistory {
  date: string
  amount: number
  type: 'manual' | 'auto' | 'rain'
}

export interface FertilizerRecommendation {
  nutrient: string
  fertilizer: string
  quantity: string
  method: string
  timing: string
  warning: string
}

export interface PestDiseaseAlert {
  name: string
  riskLevel: 'high' | 'medium' | 'low'
  symptoms: string[]
  prevention: string[]
  culturalPractices: string[]
  biologicalControl: string[]
  pesticideCategory: string
  safetyPrecautions: string
}

export interface AIAdvisory {
  cropRecommendation: string
  irrigationRecommendation: string
  fertilizerRecommendation: string
  pestDiseaseAlerts: string[]
  soilHealthAnalysis: string
  weatherAlerts: string[]
  summary: string
}