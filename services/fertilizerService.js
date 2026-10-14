/** Fertilizer Recommendation Service */
const fertilizerDatabase = {
  rice: [
    { nutrient: 'Nitrogen', fertilizer: 'Urea', reason: 'Rice requires high nitrogen', amount: '40-60 kg/ha' },
    { nutrient: 'Phosphorus', fertilizer: 'DAP', reason: 'Root development', amount: '30-40 kg/ha' }
  ],
  wheat: [
    { nutrient: 'Nitrogen', fertilizer: 'Urea', reason: 'Leafy growth', amount: '50-80 kg/ha' },
    { nutrient: 'Phosphorus', fertilizer: 'DAP', reason: 'Root development', amount: '30-40 kg/ha' }
  ],
  cotton: [
    { nutrient: 'Nitrogen', fertilizer: 'Urea', reason: 'Vegetative growth', amount: '30-50 kg/ha' },
    { nutrient: 'Potassium', fertilizer: 'MOP', reason: 'Fiber quality', amount: '30-40 kg/ha' }
  ],
  maize: [
    { nutrient: 'Nitrogen', fertilizer: 'Urea', reason: 'Rapid growth', amount: '80-120 kg/ha' },
    { nutrient: 'Potassium', fertilizer: 'MOP', reason: 'Grain fill', amount: '40-60 kg/ha' }
  ],
  tomato: [
    { nutrient: 'Nitrogen', fertilizer: 'Urea', reason: 'Vegetative growth', amount: '30-50 kg/ha' },
    { nutrient: 'Potassium', fertilizer: 'MOP', reason: 'Fruit quality', amount: '30-40 kg/ha' }
  ],
  potato: [
    { nutrient: 'Nitrogen', fertilizer: 'Urea', reason: 'Tuber development', amount: '40-60 kg/ha' },
    { nutrient: 'Potassium', fertilizer: 'MOP', reason: 'Tuber quality', amount: '30-40 kg/ha' }
  ]
}

function getFertilizerRecommendation(cropName, soilN, soilP, soilK) {
  const cropFertilizers = fertilizerDatabase[cropName.toLowerCase()]
  if (!cropFertilizers) return { error: 'Fertilizer database not available for this crop' }
  const recommendations = []
  const deficiencies = []
  for (const fert of cropFertilizers) {
    let adjustedAmount = parseFloat(fert.amount)
    if (fert.nutrient === 'Nitrogen' && soilN !== undefined) {
      if (soilN < 30) {
        adjustedAmount = Math.round(adjustedAmount * 1.4)
        deficiencies.push('Nitrogen')
      } else if (soilN > 100) adjustedAmount = Math.round(adjustedAmount * 0.7)
    } else if (fert.nutrient === 'Phosphorus' && soilP !== undefined) {
      if (soilP < 20) {
        adjustedAmount = Math.round(adjustedAmount * 1.3)
        deficiencies.push('Phosphorus')
      } else if (soilP > 80) adjustedAmount = Math.round(adjustedAmount * 0.7)
    } else if (fert.nutrient === 'Potassium' && soilK !== undefined) {
      if (soilK < 40) {
        adjustedAmount = Math.round(adjustedAmount * 1.3)
        deficiencies.push('Potassium')
      } else if (soilK > 150) adjustedAmount = Math.round(adjustedAmount * 0.7)
    }
    recommendations.push({
      nutrient: fert.nutrient,
      fertilizer: fert.fertilizer,
      reason: fert.reason,
      amount: Math.max(1, Math.round(adjustedAmount)) + ' kg/ha'
    })
  }
  const organicAlternatives = getOrganicAlternatives(cropName)
  return {
    success: true,
    crop: cropName,
    recommendations,
    deficiencies: deficiencies.length > 0 ? deficiencies : [],
    organicAlternatives,
    warnings: []
  }
}

function getOrganicAlternatives(cropName) {
  return 'Apply well-rotted FYM 8-10 t/ha at basal'
}

module.exports = { getFertilizerRecommendation, getOrganicAlternatives, fertilizerDatabase }