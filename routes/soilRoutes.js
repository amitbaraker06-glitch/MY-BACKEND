const express = require('express');
const router = express.Router();
const { body, param, query, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');
const {
  createSoilReportController,
  getSoilReportsController,
  getLatestSoilReportController,
  getSoilReportByIdController,
  getSoilReportHistoryController,
  getSoilHealthController,
  updateSoilReportController,
  deleteSoilReportController,
  getSoilThresholdsController
} = require('../controllers/soilController');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// POST /api/soil/report - Create soil report
router.post('/report', [
  body('nitrogen').isNumeric().withMessage('Nitrogen must be a number'),
  body('phosphorus').isNumeric().withMessage('Phosphorus must be a number'),
  body('potassium').isNumeric().withMessage('Potassium must be a number'),
  body('ph').isFloat({ min: 3, max: 10 }).withMessage('pH must be between 3 and 10'),
  body('moisture').optional().isFloat({ min: 0, max: 100 }).withMessage('Moisture must be between 0 and 100'),
  body('temperature').optional().isFloat({ min: -10, max: 60 }).withMessage('Temperature must be between -10 and 60'),
  body('electricalConductivity').optional().isFloat({ min: 0 }).withMessage('EC must be a positive number'),
  body('organicCarbon').optional().isFloat({ min: 0, max: 10 }).withMessage('Organic carbon must be between 0 and 10'),
  body('soilType').optional().isString(),
  body('latitude').optional().isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
  body('longitude').optional().isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
  body('notes').optional().isString(),
], validate, createSoilReportController);

// GET /api/soil/report/:farmerId - Get all soil reports for a farmer
router.get('/report/:farmerId', [
  param('farmerId').isMongoId().withMessage('Invalid farmer ID'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
], validate, getSoilReportsController);

// GET /api/soil/latest/:farmerId - Get latest soil report
router.get('/latest/:farmerId', [
  param('farmerId').isMongoId().withMessage('Invalid farmer ID'),
], validate, getLatestSoilReportController);

// GET /api/soil/report/id/:reportId - Get soil report by ID (distinct path to avoid conflict)
router.get('/report/id/:reportId', [
  param('reportId').isMongoId().withMessage('Invalid report ID'),
], validate, getSoilReportByIdController);

// GET /api/soil/history/:farmerId - Get soil report history
router.get('/history/:farmerId', [
  param('farmerId').isMongoId().withMessage('Invalid farmer ID'),
], validate, getSoilReportHistoryController);

// GET /api/soil/health/:farmerId - Get soil health summary
router.get('/health/:farmerId', [
  param('farmerId').isMongoId().withMessage('Invalid farmer ID'),
], validate, getSoilHealthController);

// PUT /api/soil/report/:reportId - Update soil report
router.put('/report/:reportId', [
  param('reportId').isMongoId().withMessage('Invalid report ID'),
  body('nitrogen').optional().isNumeric().withMessage('Nitrogen must be a number'),
  body('phosphorus').optional().isNumeric().withMessage('Phosphorus must be a number'),
  body('potassium').optional().isNumeric().withMessage('Potassium must be a number'),
  body('ph').optional().isFloat({ min: 3, max: 10 }).withMessage('pH must be between 3 and 10'),
], validate, updateSoilReportController);

// DELETE /api/soil/report/:reportId - Delete soil report
router.delete('/report/:reportId', [
  param('reportId').isMongoId().withMessage('Invalid report ID'),
], validate, deleteSoilReportController);

// GET /api/soil/thresholds - Get soil thresholds reference
router.get('/thresholds', getSoilThresholdsController);

module.exports = router;