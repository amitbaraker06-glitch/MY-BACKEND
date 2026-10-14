/**
 * Soil Nutrient Thresholds Configuration
 * These thresholds are based on general agricultural guidelines for Indian soils.
 * They should be calibrated based on local soil testing lab recommendations.
 * 
 * References:
 * - ICAR (Indian Council of Agricultural Research) soil fertility ratings
 * - State agricultural university recommendations
 * - These are general guidelines - always verify with local soil test results
 */

// Nitrogen thresholds (kg/ha) - using available N
const NITROGEN_THRESHOLDS = {
  low: { max: 280 },        // < 280 kg/ha
  medium: { min: 280, max: 560 },  // 280-560 kg/ha
  high: { min: 560 }        // > 560 kg/ha
};

// Phosphorus thresholds (kg/ha) - Olsen's P
const PHOSPHORUS_THRESHOLDS = {
  low: { max: 22 },         // < 22 kg/ha
  medium: { min: 22, max: 55 },    // 22-55 kg/ha
  high: { min: 55 }         // > 55 kg/ha
};

// Potassium thresholds (kg/ha) - available K
const POTASSIUM_THRESHOLDS = {
  low: { max: 135 },        // < 135 kg/ha
  medium: { min: 135, max: 335 },  // 135-335 kg/ha
  high: { min: 335 }        // > 335 kg/ha
};

// pH thresholds
const PH_THRESHOLDS = {
  stronglyAcidic: { max: 5.0 },
  acidic: { min: 5.0, max: 6.5 },
  neutral: { min: 6.5, max: 7.5 },
  alkaline: { min: 7.5, max: 8.5 },
  stronglyAlkaline: { min: 8.5 }
};

// Electrical Conductivity thresholds (dS/m)
const EC_THRESHOLDS = {
  nonSaline: { max: 2 },
  slightlySaline: { min: 2, max: 4 },
  moderatelySaline: { min: 4, max: 8 },
  stronglySaline: { min: 8 }
};

// Organic Carbon thresholds (%)
const ORGANIC_CARBON_THRESHOLDS = {
  low: { max: 0.5 },
  medium: { min: 0.5, max: 0.75 },
  high: { min: 0.75 }
};

/**
 * Determine nitrogen status
 */
function getNitrogenStatus(value) {
  if (value < NITROGEN_THRESHOLDS.low.max) return 'Low';
  if (value <= NITROGEN_THRESHOLDS.medium.max) return 'Medium';
  return 'High';
}

/**
 * Determine phosphorus status
 */
function getPhosphorusStatus(value) {
  if (value < PHOSPHORUS_THRESHOLDS.low.max) return 'Low';
  if (value <= PHOSPHORUS_THRESHOLDS.medium.max) return 'Medium';
  return 'High';
}

/**
 * Determine potassium status
 */
function getPotassiumStatus(value) {
  if (value < POTASSIUM_THRESHOLDS.low.max) return 'Low';
  if (value <= POTASSIUM_THRESHOLDS.medium.max) return 'Medium';
  return 'High';
}

/**
 * Determine pH status
 */
function getPhStatus(value) {
  if (value < PH_THRESHOLDS.stronglyAcidic.max) return 'Strongly Acidic';
  if (value < PH_THRESHOLDS.acidic.max) return 'Acidic';
  if (value <= PH_THRESHOLDS.neutral.max) return 'Neutral';
  if (value <= PH_THRESHOLDS.alkaline.max) return 'Alkaline';
  return 'Strongly Alkaline';
}

/**
 * Determine EC status
 */
function getEcStatus(value) {
  if (value < EC_THRESHOLDS.nonSaline.max) return 'Non-saline';
  if (value < EC_THRESHOLDS.slightlySaline.max) return 'Slightly Saline';
  if (value < EC_THRESHOLDS.moderatelySaline.max) return 'Moderately Saline';
  return 'Strongly Saline';
}

/**
 * Determine Organic Carbon status
 */
function getOrganicCarbonStatus(value) {
  if (value < ORGANIC_CARBON_THRESHOLDS.low.max) return 'Low';
  if (value <= ORGANIC_CARBON_THRESHOLDS.medium.max) return 'Medium';
  return 'High';
}

/**
 * Calculate all soil statuses
 */
function calculateSoilStatus(soilData) {
  return {
    nitrogen: getNitrogenStatus(soilData.nitrogen),
    phosphorus: getPhosphorusStatus(soilData.phosphorus),
    potassium: getPotassiumStatus(soilData.potassium),
    ph: getPhStatus(soilData.ph),
    electricalConductivity: soilData.electricalConductivity ? getEcStatus(soilData.electricalConductivity) : null,
    organicCarbon: soilData.organicCarbon ? getOrganicCarbonStatus(soilData.organicCarbon) : null
  };
}

/**
 * Get thresholds for reference
 */
function getThresholds() {
  return {
    nitrogen: NITROGEN_THRESHOLDS,
    phosphorus: PHOSPHORUS_THRESHOLDS,
    potassium: POTASSIUM_THRESHOLDS,
    ph: PH_THRESHOLDS,
    electricalConductivity: EC_THRESHOLDS,
    organicCarbon: ORGANIC_CARBON_THRESHOLDS
  };
}

module.exports = {
  getNitrogenStatus,
  getPhosphorusStatus,
  getPotassiumStatus,
  getPhStatus,
  getEcStatus,
  getOrganicCarbonStatus,
  calculateSoilStatus,
  getThresholds,
  NITROGEN_THRESHOLDS,
  PHOSPHORUS_THRESHOLDS,
  POTASSIUM_THRESHOLDS,
  PH_THRESHOLDS,
  EC_THRESHOLDS,
  ORGANIC_CARBON_THRESHOLDS
};