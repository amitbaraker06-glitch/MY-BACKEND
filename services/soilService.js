const SoilReport = require('../models/SoilReport');
const { calculateSoilStatus, getThresholds } = require('./soilThresholds');

/**
 * Create a new soil report
 */
async function createSoilReport(data) {
  const status = calculateSoilStatus(data);
  
  const report = new SoilReport({
    ...data,
    status
  });
  
  return await report.save();
}

/**
 * Get soil reports by farmer ID
 */
async function getSoilReportsByFarmer(farmerId, options = {}) {
  const { limit = 20, page = 1, sort = '-createdAt' } = options;
  
  const query = { farmerId };
  const reports = await SoilReport.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);
    
  const total = await SoilReport.countDocuments(query);
  
  return {
    reports,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
}

/**
 * Get latest soil report for a farmer
 */
async function getLatestSoilReport(farmerId) {
  return await SoilReport.findOne({ farmerId })
    .sort('-createdAt');
}

/**
 * Get soil report by ID
 */
async function getSoilReportById(reportId) {
  return await SoilReport.findById(reportId);
}

/**
 * Get soil report history for a farmer
 */
async function getSoilReportHistory(farmerId) {
  return await SoilReport.find({ farmerId })
    .sort('-createdAt')
    .select('nitrogen phosphorus potassium ph moisture temperature soilType status createdAt');
}

/**
 * Update soil report
 */
async function updateSoilReport(reportId, farmerId, updates) {
  const allowedUpdates = [
    'nitrogen', 'phosphorus', 'potassium', 'ph', 'moisture', 
    'temperature', 'electricalConductivity', 'organicCarbon', 
    'soilType', 'latitude', 'longitude', 'notes'
  ];
  
  const filteredUpdates = {};
  for (const key of allowedUpdates) {
    if (updates[key] !== undefined) {
      filteredUpdates[key] = updates[key];
    }
  }
  
  // Recalculate status if nutrient values changed
  const nutrientKeys = ['nitrogen', 'phosphorus', 'potassium', 'ph'];
  const hasNutrientChange = nutrientKeys.some(key => filteredUpdates[key] !== undefined);
  
  if (hasNutrientChange) {
    // Get current report to merge with updates
    const current = await SoilReport.findById(reportId);
    if (current) {
      const mergedData = {
        nitrogen: filteredUpdates.nitrogen ?? current.nitrogen,
        phosphorus: filteredUpdates.phosphorus ?? current.phosphorus,
        potassium: filteredUpdates.potassium ?? current.potassium,
        ph: filteredUpdates.ph ?? current.ph
      };
      filteredUpdates.status = calculateSoilStatus(mergedData);
    }
  }
  
  return await SoilReport.findOneAndUpdate(
    { _id: reportId, farmerId },
    filteredUpdates,
    { new: true, runValidators: true }
  );
}

/**
 * Delete soil report
 */
async function deleteSoilReport(reportId, farmerId) {
  return await SoilReport.findOneAndDelete({ _id: reportId, farmerId });
}

module.exports = {
  createSoilReport,
  getSoilReportsByFarmer,
  getLatestSoilReport,
  getSoilReportById,
  getSoilReportHistory,
  updateSoilReport,
  deleteSoilReport
};