const express = require('express');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');
const { getWeatherController, getWeatherAlertsController } = require('../controllers/weatherController');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// GET /api/weather - Get weather by coordinates
router.get('/', [
  query('lat').optional().isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
  query('lon').optional().isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
  query('latitude').optional().isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
  query('longitude').optional().isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
], validate, getWeatherController);

// GET /api/weather/alerts - Get weather alerts
router.get('/alerts', [
  query('lat').optional().isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
  query('lon').optional().isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
], validate, getWeatherAlertsController);

module.exports = router;