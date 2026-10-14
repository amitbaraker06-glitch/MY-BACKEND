const { getLatestSoilReport } = require('./soilService');
const { calculateSoilStatus, getThresholds } = require('./soilThresholds');

/**
 * Get moisture status
 */
function getMoistureStatus(moisture) {
  if (moisture < 20) return 'Very Low';
  if (moisture < 40) return 'Low';
  if (moisture < 60) return 'Optimal';
  if (moisture < 80) return 'High';
  return 'Very High';
}

/**
 * Determine overall soil health status
 */
function determineOverallStatus(status) {
  const scores = {
    'Low': 1,
    'Medium': 2,
    'High': 3,
    'Strongly Acidic': 1,
    'Acidic': 2,
    'Neutral': 3,
    'Alkaline': 2,
    'Strongly Alkaline': 1,
    'Very Low': 1,
    'Optimal': 3,
    'High': 2,
    'Very High': 1,
    'Non-saline': 3,
    'Slightly Saline': 2,
    'Moderately Saline': 1,
    'Strongly Saline': 1
  };
  
  const relevantStatuses = [
    status.nitrogen,
    status.phosphorus,
    status.potassium,
    status.ph
  ].filter(Boolean);
  
  const totalScore = relevantStatuses.reduce((sum, s) => sum + (scores[s] || 2), 0);
  const avgScore = totalScore / relevantStatuses.length;
  
  if (avgScore >= 2.5) return 'Excellent';
  if (avgScore >= 2) return 'Good';
  if (avgScore >= 1.5) return 'Fair';
  return 'Poor';
}

/**
 * Generate recommendations based on soil status
 */
function generateRecommendations(report, status) {
  const recommendations = [];
  
  // Nitrogen recommendations
  if (status.nitrogen === 'Low') {
    recommendations.push({
      nutrient: 'Nitrogen',
      priority: 'High',
      recommendation: 'Apply nitrogen-rich fertilizers (Urea, Ammonium Sulphate) or organic matter (FYM, compost, green manure)',
      type: 'deficiency'
    });
  } else if (status.nitrogen === 'High') {
    recommendations.push({
      nutrient: 'Nitrogen',
      priority: 'Medium',
      recommendation: 'Reduce nitrogen application. Excess nitrogen can delay maturity and increase pest susceptibility.',
      type: 'excess'
    });
  }
  
  // Phosphorus recommendations
  if (status.phosphorus === 'Low') {
    recommendations.push({
      nutrient: 'Phosphorus',
      priority: 'High',
      recommendation: 'Apply phosphatic fertilizers (SSP, DAP, Rock Phosphate) at sowing/transplanting',
      type: 'deficiency'
    });
  } else if (status.phosphorus === 'High') {
    recommendations.push({
      nutrient: 'Phosphorus',
      priority: 'Low',
      recommendation: 'Phosphorus is adequate. Avoid excess application to prevent environmental issues.',
      type: 'excess'
    });
  }
  
  // Potassium recommendations
  if (status.potassium === 'Low') {
    recommendations.push({
      nutrient: 'Potassium',
      priority: 'High',
      recommendation: 'Apply potassic fertilizers (MOP, SOP) - important for drought resistance and grain quality',
      type: 'deficiency'
    });
  } else if (status.potassium === 'High') {
    recommendations.push({
      nutrient: 'Potassium',
      priority: 'Low',
      recommendation: 'Potassium is adequate. Monitor for magnesium/calcium imbalance.',
      type: 'excess'
    });
  }
  
  // pH recommendations
  if (status.ph === 'Strongly Acidic' || status.ph === 'Acidic') {
    recommendations.push({
      nutrient: 'pH',
      priority: 'High',
      recommendation: 'Apply lime (calcium carbonate) or dolomite to raise pH. Target pH 6.5-7.0 for most crops.',
      type: 'correction'
    });
  } else if (status.ph === 'Alkaline' || status.ph === 'Strongly Alkaline') {
    recommendations.push({
      nutrient: 'pH',
      priority: 'High',
      recommendation: 'Apply gypsum, elemental sulphur, or organic matter to lower pH. Use acidifying fertilizers.',
      type: 'correction'
    });
  }
  
  // EC recommendations
  if (status.electricalConductivity && (status.electricalConductivity === 'Moderately Saline' || status.electricalConductivity === 'Strongly Saline')) {
    recommendations.push({
      nutrient: 'Salinity',
      priority: 'High',
      recommendation: 'Improve drainage, leach salts with irrigation, use salt-tolerant crops, apply gypsum for sodic soils.',
      type: 'correction'
    });
  }
  
  // Organic carbon recommendations
  if (status.organicCarbon === 'Low') {
    recommendations.push({
      nutrient: 'Organic Carbon',
      priority: 'Medium',
      recommendation: 'Incorporate organic matter: FYM (10-15 t/ha), compost, green manuring, crop residue retention.',
      type: 'improvement'
    });
  }
  
  // Moisture recommendations
  if (report.moisture !== undefined) {
    const moistureStatus = getMoistureStatus(report.moisture);
    if (moistureStatus === 'Very Low' || moistureStatus === 'Low') {
      recommendations.push({
        nutrient: 'Moisture',
        priority: 'High',
        recommendation: 'Irrigation needed. Check soil moisture at root zone depth.',
        type: 'deficiency'
      });
    } else if (moistureStatus === 'Very High') {
      recommendations.push({
        nutrient: 'Moisture',
        priority: 'Medium',
        recommendation: 'Excess moisture. Ensure proper drainage to prevent root rot.',
        type: 'excess'
      });
    }
  }
  
  return recommendations;
}

module.exports = {
  getMoistureStatus,
  determineOverallStatus,
  generateRecommendations
};