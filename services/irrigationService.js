/** Irrigation Recommendation Service */
const waterRequirements = {
  rice: { requirement: 'High', frequency: 'Daily standing water', total: '1000-2500mm' },
  wheat: { requirement: 'Moderate', frequency: 'Intermittent', total: '400-900mm' },
  cotton: { requirement: 'Moderate', frequency: 'Weekly', total: '500-1000mm' },
  soybean: { requirement: 'Moderate', frequency: 'Weekly', total: '500-800mm' },
  maize: { requirement: 'Moderate-High', frequency: 'Weekly', total: '600-1200mm' },
  tomato: { requirement: 'Moderate', frequency: 'Weekly', total: '400-600mm' },
  potato: { requirement: 'Moderate-High', frequency: 'Weekly', total: '400-500mm' },
  groundnut: { requirement: 'Low-Moderate', frequency: 'Weekly', total: '400-600mm' },
  sugarcane: { requirement: 'Very High', frequency: 'Daily/alternate day', total: '1000-1500mm' },
  sorghum: { requirement: 'Low-Moderate', frequency: '10-15 days', total: '400-600mm' },
  pigeonpea: { requirement: 'Low-Moderate', frequency: '10-15 days', total: '500-800mm' }
};

/** Get irrigation advisory for a crop and soil moisture */
function getIrrigationAdvisory(cropName, soilMoisture) {
  const cropRequirements = waterRequirements[cropName.toLowerCase()];
  if (!cropRequirements) return { requirement: 'Moderate', frequency: 'As needed', total: 'Check local conditions' };

  let adjustedFrequency = cropRequirements.frequency;
  if (soilMoisture !== undefined) {
    if (soilMoisture < 20) adjustedFrequency = 'Increase frequency - very low moisture';
    else if (soilMoisture < 40) adjustedFrequency = 'Increase frequency - low moisture';
    else if (soilMoisture > 80) adjustedFrequency = 'Reduce frequency - high moisture';
  }

  return {
    requirement: cropRequirements.requirement,
    frequency: adjustedFrequency,
    total: cropRequirements.total
  };
}

/** Adjust irrigation based on growth stage */
function adjustForGrowthStage(baseAdvisory, growthStage) {
  const stageAdjustments = {
    seedling: 'Keep soil consistently moist',
    vegetative: 'Maintain regular schedule',
    flowering: 'Ensure adequate water - critical stage',
    fruiting: 'Maintain consistent moisture',
    maturation: 'Reduce water slightly as crop matures'
  };

  let adjustment = baseAdvisory.frequency;
  if (growthStage && stageAdjustments[growthStage]) {
    adjustment = `${stageAdjustments[growthStage]} (${baseAdvisory.frequency})`;
  }

  return { ...baseAdvisory, frequency: adjustment };
}

module.exports = { getIrrigationAdvisory, adjustForGrowthStage };