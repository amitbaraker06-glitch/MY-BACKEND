/**
 * Convert WMO weather code to human readable condition
 * Reference: https://open-meteo.com/en/docs#weathercode
 */
function getWeatherCondition(code) {
  const conditions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  return conditions[code] || 'Unknown';
}

/**
 * Get weather alerts based on forecast
 */
function getWeatherAlerts(dailyForecast) {
  const alerts = [];

  dailyForecast.forEach(day => {
    // Heavy rainfall alert
    if (day.precipitationSum > 50) {
      alerts.push({
        type: 'heavy_rainfall',
        severity: 'high',
        date: day.date,
        message: `Heavy rainfall expected (${day.precipitationSum}mm)`
      });
    } else if (day.precipitationSum > 20) {
      alerts.push({
        type: 'moderate_rainfall',
        severity: 'medium',
        date: day.date,
        message: `Moderate rainfall expected (${day.precipitationSum}mm)`
      });
    }

    // High temperature alert
    if (day.maxTemperature > 40) {
      alerts.push({
        type: 'heat_wave',
        severity: 'high',
        date: day.date,
        message: `Extreme heat expected (${day.maxTemperature}°C)`
      });
    } else if (day.maxTemperature > 35) {
      alerts.push({
        type: 'high_temperature',
        severity: 'medium',
        date: day.date,
        message: `High temperature expected (${day.maxTemperature}°C)`
      });
    }

    // Low temperature alert
    if (day.minTemperature < 5) {
      alerts.push({
        type: 'frost_risk',
        severity: 'high',
        date: day.date,
        message: `Frost risk (${day.minTemperature}°C)`
      });
    } else if (day.minTemperature < 10) {
      alerts.push({
        type: 'cold_risk',
        severity: 'medium',
        date: day.date,
        message: `Low temperature (${day.minTemperature}°C)`
      });
    }

    // High wind alert
    if (day.maxWindSpeed > 50) {
      alerts.push({
        type: 'strong_wind',
        severity: 'high',
        date: day.date,
        message: `Strong winds expected (${day.maxWindSpeed} km/h)`
      });
    } else if (day.maxWindSpeed > 30) {
      alerts.push({
        type: 'moderate_wind',
        severity: 'medium',
        date: day.date,
        message: `Moderate winds expected (${day.maxWindSpeed} km/h)`
      });
    }
  });

  return alerts;
}

module.exports = {
  getWeatherCondition,
  getWeatherAlerts
};