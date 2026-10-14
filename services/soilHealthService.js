const { getLatestSoilReport } = require('./soilService');
const { calculateSoilStatus, getThresholds } = require('./soilThresholds');
const { getMoistureStatus, determineOverallStatus, generateRecommendations } = require('./soilUtils');

/**
 * Get soil health summary for dashboard
 */
async function getSoilHealthSummary(farmerId) {
  const latestReport = await getLatestSoilReport(farmerId);
  
  if (!latestReport) {
    return null;
  }
  
  const status = latestReport.status || calculateSoilStatus(latestReport);
  
  // Generate recommendations based on status
  const recommendations = generateRecommendations(latestReport, status);
  
  // Determine overall status
  const overallStatus = determineOverallStatus(status);
  
  return {
    overallStatus,
    nitrogen: { value: latestReport.nitrogen, status: status.nitrogen },
    phosphorus: { value: latestReport.phosphorus, status: status.phosphorus },
    potassium: { value: latestReport.potassium, status: status.potassium },
    ph: { value: latestReport.ph, status: status.ph },
    moisture: latestReport.moisture ? { value: latestReport.moisture, status: getMoistureStatus(latestReport.moisture) } : null,
    electricalConductivity: latestReport.electricalConductivity ? { 
      value: latestReport.electricalConductivity, 
      status: status.electricalConductivity 
    } : null,
    organicCarbon: latestReport.organicCarbon ? { 
      value: latestReport.organicCarbon, 
      status: status.organicCarbon 
    } : null,
    soilType: latestReport.soilType,
    recommendations,
    lastUpdated: latestReport.createdAt
  };
}

/**
 * Get thresholds for reference
 */
function getSoilThresholds() {
  return getThresholds();
}

module.exports = {
  getSoilHealthSummary,
  getSoilThresholds
};