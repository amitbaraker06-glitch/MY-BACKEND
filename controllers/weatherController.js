const { getWeather } = require('../services/weatherService');
const { getWeatherCondition, getWeatherAlerts } = require('../services/weatherUtils');

/**
 * GET /api/weather?lat=16.8302&lon=75.7100
 * Get current weather and forecast for given coordinates
 */
async function getWeatherController(req, res) {
  try {
    const { lat, lon, latitude, longitude } = req.query;
    
    const latitudeParsed = parseFloat(latitude || lat);
    const longitudeParsed = parseFloat(longitude || lon);

    if (isNaN(latitudeParsed) || isNaN(longitudeParsed)) {
      return res.status(400).json({
        success: false,
        message: 'Valid latitude and longitude are required (lat, lon or latitude, longitude)'
      });
    }

    if (latitudeParsed < -90 || latitudeParsed > 90) {
      return res.status(400).json({
        success: false,
        message: 'Latitude must be between -90 and 90'
      });
    }

    if (longitudeParsed < -180 || longitudeParsed > 180) {
      return res.status(400).json({
        success: false,
        message: 'Longitude must be between -180 and 180'
      });
    }

    const weatherData = await getWeather(latitudeParsed, longitudeParsed);
    
    // Add weather alerts
    weatherData.alerts = getWeatherAlerts(weatherData.daily);

    res.json(weatherData);
  } catch (error) {
    console.error('Weather Controller Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch weather data'
    });
  }
}

/**
 * GET /api/weather/alerts?lat=16.8302&lon=75.7100
 * Get only weather alerts for given coordinates
 */
async function getWeatherAlertsController(req, res) {
  try {
    const { lat, lon, latitude, longitude } = req.query;
    
    const latitudeParsed = parseFloat(latitude || lat);
    const longitudeParsed = parseFloat(longitude || lon);

    if (isNaN(latitudeParsed) || isNaN(longitudeParsed)) {
      return res.status(400).json({
        success: false,
        message: 'Valid latitude and longitude are required'
      });
    }

    const weatherData = await getWeather(latitudeParsed, longitudeParsed);
    const alerts = getWeatherAlerts(weatherData.daily);

    res.json({
      success: true,
      alerts,
      location: weatherData.location
    });
  } catch (error) {
    console.error('Weather Alerts Controller Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch weather alerts'
    });
  }
}

module.exports = {
  getWeatherController,
  getWeatherAlertsController
};