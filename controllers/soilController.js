const { 
  createSoilReport, 
  getSoilReportsByFarmer, 
  getLatestSoilReport, 
  getSoilReportById, 
  getSoilReportHistory,
  updateSoilReport,
  deleteSoilReport
} = require('../services/soilService');
const { getSoilHealthSummary, getSoilThresholds } = require('../services/soilHealthService');

/**
 * POST /api/soil/report
 * Create a new soil report
 */
async function createSoilReportController(req, res) {
  try {
    const farmerId = req.user?.id || req.body.farmerId;
    
    if (!farmerId) {
      return res.status(400).json({
        success: false,
        message: 'Farmer ID is required (either from auth token or request body)'
      });
    }

    const reportData = {
      farmerId,
      nitrogen: req.body.nitrogen,
      phosphorus: req.body.phosphorus,
      potassium: req.body.potassium,
      ph: req.body.ph,
      moisture: req.body.moisture,
      temperature: req.body.temperature,
      electricalConductivity: req.body.electricalConductivity,
      organicCarbon: req.body.organicCarbon,
      soilType: req.body.soilType,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      notes: req.body.notes
    };

    // Validate required fields
    const requiredFields = ['nitrogen', 'phosphorus', 'potassium', 'ph'];
    const missingFields = requiredFields.filter(field => reportData[field] === undefined || reportData[field] === null);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const report = await createSoilReport(reportData);
    
    res.status(201).json({
      success: true,
      message: 'Soil report created successfully',
      report
    });
  } catch (error) {
    console.error('Create Soil Report Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create soil report'
    });
  }
}

/**
 * GET /api/soil/report/:farmerId
 * Get all soil reports for a farmer
 */
async function getSoilReportsController(req, res) {
  try {
    const { farmerId } = req.params;
    const { page = 1, limit = 20, sort = '-createdAt' } = req.query;

    const result = await getSoilReportsByFarmer(farmerId, { page: parseInt(page), limit: parseInt(limit), sort });
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Get Soil Reports Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch soil reports'
    });
  }
}

/**
 * GET /api/soil/latest/:farmerId
 * Get latest soil report for a farmer
 */
async function getLatestSoilReportController(req, res) {
  try {
    const { farmerId } = req.params;
    
    const report = await getLatestSoilReport(farmerId);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'No soil report found for this farmer'
      });
    }
    
    res.json({
      success: true,
      report
    });
  } catch (error) {
    console.error('Get Latest Soil Report Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch latest soil report'
    });
  }
}

/**
 * GET /api/soil/report/:reportId
 * Get soil report by ID
 */
async function getSoilReportByIdController(req, res) {
  try {
    const { reportId } = req.params;
    
    const report = await getSoilReportById(reportId);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Soil report not found'
      });
    }
    
    res.json({
      success: true,
      report
    });
  } catch (error) {
    console.error('Get Soil Report Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch soil report'
    });
  }
}

/**
 * GET /api/soil/history/:farmerId
 * Get soil report history for a farmer
 */
async function getSoilReportHistoryController(req, res) {
  try {
    const { farmerId } = req.params;
    
    const history = await getSoilReportHistory(farmerId);
    
    res.json({
      success: true,
      history
    });
  } catch (error) {
    console.error('Get Soil Report History Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch soil report history'
    });
  }
}

/**
 * GET /api/soil/health/:farmerId
 * Get soil health summary for a farmer
 */
async function getSoilHealthController(req, res) {
  try {
    const { farmerId } = req.params;
    
    const health = await getSoilHealthSummary(farmerId);
    
    if (!health) {
      return res.status(404).json({
        success: false,
        message: 'No soil report found for this farmer. Please create a soil report first.'
      });
    }
    
    res.json({
      success: true,
      health
    });
  } catch (error) {
    console.error('Get Soil Health Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch soil health summary'
    });
  }
}

/**
 * PUT /api/soil/report/:reportId
 * Update soil report
 */
async function updateSoilReportController(req, res) {
  try {
    const { reportId } = req.params;
    const farmerId = req.user?.id || req.body.farmerId;
    
    if (!farmerId) {
      return res.status(400).json({
        success: false,
        message: 'Farmer ID is required'
      });
    }

    const report = await updateSoilReport(reportId, farmerId, req.body);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Soil report not found or access denied'
      });
    }
    
    res.json({
      success: true,
      message: 'Soil report updated successfully',
      report
    });
  } catch (error) {
    console.error('Update Soil Report Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update soil report'
    });
  }
}

/**
 * DELETE /api/soil/report/:reportId
 * Delete soil report
 */
async function deleteSoilReportController(req, res) {
  try {
    const { reportId } = req.params;
    const farmerId = req.user?.id || req.body.farmerId;
    
    if (!farmerId) {
      return res.status(400).json({
        success: false,
        message: 'Farmer ID is required'
      });
    }

    const report = await deleteSoilReport(reportId, farmerId);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Soil report not found or access denied'
      });
    }
    
    res.json({
      success: true,
      message: 'Soil report deleted successfully'
    });
  } catch (error) {
    console.error('Delete Soil Report Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete soil report'
    });
  }
}

/**
 * GET /api/soil/thresholds
 * Get soil nutrient thresholds reference
 */
async function getSoilThresholdsController(req, res) {
  try {
    const thresholds = getSoilThresholds();
    
    res.json({
      success: true,
      thresholds,
      note: 'These are general guidelines based on ICAR recommendations for Indian soils. Always verify with local soil testing laboratory for crop-specific recommendations.'
    });
  } catch (error) {
    console.error('Get Soil Thresholds Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch soil thresholds'
    });
  }
}

module.exports = {
  createSoilReportController,
  getSoilReportsController,
  getLatestSoilReportController,
  getSoilReportByIdController,
  getSoilReportHistoryController,
  getSoilHealthController,
  updateSoilReportController,
  deleteSoilReportController,
  getSoilThresholdsController
};