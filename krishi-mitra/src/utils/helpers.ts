export function getSoilMoistureStatus(moisture: number): { label: string; color: string; bgColor: string } {
  if (moisture < 30) return { label: 'Low', color: 'text-red-700', bgColor: 'bg-red-100' }
  if (moisture > 70) return { label: 'High', color: 'text-blue-700', bgColor: 'bg-blue-100' }
  return { label: 'Optimal', color: 'text-green-700', bgColor: 'bg-green-100' }
}

export function getPHClassification(ph: number): { label: string; color: string; bgColor: string; suitableCrops: string[] } {
  if (ph < 6.0) return { 
    label: 'Acidic', 
    color: 'text-orange-700', 
    bgColor: 'bg-orange-100',
    suitableCrops: ['Tea', 'Potato', 'Sweet Potato', 'Pineapple', 'Blueberry']
  }
  if (ph > 7.5) return { 
    label: 'Alkaline', 
    color: 'text-purple-700', 
    bgColor: 'bg-purple-100',
    suitableCrops: ['Alfalfa', 'Asparagus', 'Beetroot', 'Cabbage', 'Cauliflower']
  }
  return { 
    label: 'Neutral', 
    color: 'text-green-700', 
    bgColor: 'bg-green-100',
    suitableCrops: ['Most crops', 'Wheat', 'Rice', 'Maize', 'Soybean', 'Tomato']
  }
}

export function getNutrientStatus(value: number, optimalMin: number, optimalMax: number): { label: string; color: string; bgColor: string; icon: string } {
  if (value < optimalMin) return { label: 'Deficient', color: 'text-red-700', bgColor: 'bg-red-100', icon: '↓' }
  if (value > optimalMax) return { label: 'Excessive', color: 'text-orange-700', bgColor: 'bg-orange-100', icon: '↑' }
  return { label: 'Optimal', color: 'text-green-700', bgColor: 'bg-green-100', icon: '✓' }
}

export function getIrrigationStatusColor(status: 'none' | 'recommended' | 'urgent'): { color: string; bgColor: string; icon: string } {
  switch (status) {
    case 'urgent':
      return { color: 'text-red-700', bgColor: 'bg-red-100', icon: '🔴' }
    case 'recommended':
      return { color: 'text-yellow-700', bgColor: 'bg-yellow-100', icon: '🟡' }
    default:
      return { color: 'text-green-700', bgColor: 'bg-green-100', icon: '🟢' }
  }
}

export function getRiskLevelColor(level: 'high' | 'medium' | 'low'): { color: string; bgColor: string } {
  switch (level) {
    case 'high':
      return { color: 'text-red-700', bgColor: 'bg-red-100' }
    case 'medium':
      return { color: 'text-yellow-700', bgColor: 'bg-yellow-100' }
    default:
      return { color: 'text-green-700', bgColor: 'bg-green-100' }
  }
}

export function getSuitabilityColor(suitability: 'suitable' | 'moderate' | 'unsuitable'): { color: string; bgColor: string; label: string } {
  switch (suitability) {
    case 'suitable':
      return { color: 'text-green-700', bgColor: 'bg-green-100', label: 'Suitable' }
    case 'moderate':
      return { color: 'text-yellow-700', bgColor: 'bg-yellow-100', label: 'Moderate' }
    default:
      return { color: 'text-red-700', bgColor: 'bg-red-100', label: 'Unsuitable' }
  }
}

export function formatNumber(num: number, decimals = 0): string {
  return num.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export function calculateSoilHealthScore(soil: { moisture: number; ph: number; nitrogen: number; phosphorus: number; potassium: number }): number {
  let score = 0
  
  // Moisture score (0-25)
  if (soil.moisture >= 40 && soil.moisture <= 70) score += 25
  else if (soil.moisture >= 30 && soil.moisture <= 80) score += 15
  else score += 5
  
  // pH score (0-25)
  if (soil.ph >= 6.0 && soil.ph <= 7.5) score += 25
  else if (soil.ph >= 5.5 && soil.ph <= 8.0) score += 15
  else score += 5
  
  // Nitrogen score (0-16.67)
  if (soil.nitrogen >= 40 && soil.nitrogen <= 60) score += 16.67
  else if (soil.nitrogen >= 30 && soil.nitrogen <= 70) score += 10
  else score += 5
  
  // Phosphorus score (0-16.67)
  if (soil.phosphorus >= 25 && soil.phosphorus <= 40) score += 16.67
  else if (soil.phosphorus >= 15 && soil.phosphorus <= 50) score += 10
  else score += 5
  
  // Potassium score (0-16.67)
  if (soil.potassium >= 30 && soil.potassium <= 50) score += 16.67
  else if (soil.potassium >= 20 && soil.potassium <= 60) score += 10
  else score += 5
  
  return Math.round(score)
}

export const chartColors = {
  primary: '#16a34a',
  primaryLight: '#86efac',
  secondary: '#2563eb',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
  grid: '#e5e7eb',
  text: '#6b7280',
}

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: { size: 14 },
      bodyFont: { size: 13 },
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#6b7280', font: { size: 11 } },
    },
    y: {
      grid: { color: '#e5e7eb' },
      ticks: { color: '#6b7280', font: { size: 11 } },
    },
  },
}