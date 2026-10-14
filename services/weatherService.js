const axios = require('axios');

/**
 * Weather Service using Open-Meteo API (free, no API key required)
 * Documentation: https://open-meteo.com/
 */

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Get current weather and forecast for given coordinates
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {Promise<Object>} Weather data
 */
async function getWeather(latitude, longitude) {
  try {
    const params = {
      latitude,
      longitude,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'precipitation',
        'rain',
        'weather_code',
        'wind_speed_10m',
        'soil_moisture_0_to_1cm',
        'soil_temperature_0_to_1cm'
      ].join(','),
      hourly: [
        'temperature_2m',
        'relative_humidity_2m',
        'precipitation_probability',
        'precipitation',
        'rain',
        'weather_code',
        'wind_speed_10m',
        'soil_moisture_0_to_1cm'
      ].join(','),
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'precipitation_sum',
        'precipitation_probability_max',
        'wind_speed_10m_max',
        'relative_humidity_2m_max',
        'relative_humidity_2m_min'
      ].join(','),
      timezone: 'auto',
      forecast_days: 7
    };

    const response = await axios.get(OPEN_METEO_BASE_URL, { params, timeout: 10000 });
    const data = response.data;

    return {
      success: true,
      location: {
        latitude: data.latitude,
        longitude: data.longitude,
        elevation: data.elevation,
        timezone: data.timezone
      },
      current: formatCurrentWeather(data.current, data.current_units),
      hourly: formatHourlyForecast(data.hourly, data.hourly_units),
      daily: formatDailyForecast(data.daily, data.daily_units)
    };
  } catch (error) {
    console.error('Weather API Error:', error.message);
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}

/**
 * Format current weather data
 */
function formatCurrentWeather(current, units) {
  if (!current) return null;

  return {
    temperature: current.temperature_2m,
    temperatureUnit: units.temperature_2m,
    humidity: current.relative_humidity_2m,
    humidityUnit: units.relative_humidity_2m,
    rainfall: current.rain || 0,
    rainfallUnit: units.rain || 'mm',
    precipitation: current.precipitation,
    precipitationUnit: units.precipitation || 'mm',
    windSpeed: current.wind_speed_10m,
    windSpeedUnit: units.wind_speed_10m,
    weatherCode: current.weather_code,
    condition: getWeatherCondition(current.weather_code),
    soilMoisture: current.soil_moisture_0_to_1cm,
    soilMoistureUnit: units.soil_moisture_0_to_1cm,
    soilTemperature: current.soil_temperature_0_to_1cm,
    soilTemperatureUnit: units.soil_temperature_0_to_1cm,
    observedAt: current.time
  };
}

/**
 * Format hourly forecast
 */
function formatHourlyForecast(hourly, units) {
  if (!hourly || !hourly.time) return [];

  const hours = hourly.time.length;
  const result = [];

  for (let i = 0; i < Math.min(hours, 48); i++) { // Next 48 hours
    result.push({
      time: hourly.time[i],
      temperature: hourly.temperature_2m?.[i],
      temperatureUnit: units.temperature_2m,
      humidity: hourly.relative_humidity_2m?.[i],
      humidityUnit: units.relative_humidity_2m,
      precipitationProbability: hourly.precipitation_probability?.[i],
      precipitation: hourly.precipitation?.[i],
      rain: hourly.rain?.[i],
      weatherCode: hourly.weather_code?.[i],
      condition: hourly.weather_code?.[i] ? getWeatherCondition(hourly.weather_code[i]) : null,
      windSpeed: hourly.wind_speed_10m?.[i],
      windSpeedUnit: units.wind_speed_10m,
      soilMoisture: hourly.soil_moisture_0_to_1cm?.[i],
      soilMoistureUnit: units.soil_moisture_0_to_1cm
    });
  }

  return result;
}

/**
 * Format daily forecast
 */
function formatDailyForecast(daily, units) {
  if (!daily || !daily.time) return [];

  const days = daily.time.length;
  const result = [];

  for (let i = 0; i < days; i++) {
    result.push({
      date: daily.time[i],
      weatherCode: daily.weather_code?.[i],
      condition: daily.weather_code?.[i] ? getWeatherCondition(daily.weather_code[i]) : null,
      maxTemperature: daily.temperature_2m_max?.[i],
      minTemperature: daily.temperature_2m_min?.[i],
      temperatureUnit: units.temperature_2m_max,
      precipitationSum: daily.precipitation_sum?.[i],
      precipitationUnit: units.precipitation_sum,
      precipitationProbability: daily.precipitation_probability_max?.[i],
      maxWindSpeed: daily.wind_speed_10m_max?.[i],
      windSpeedUnit: units.wind_speed_10m_max,
      maxHumidity: daily.relative_humidity_2m_max?.[i],
      minHumidity: daily.relative_humidity_2m_min?.[i],
      humidityUnit: units.relative_humidity_2m_max
    });
  }

  return result;
}

module.exports = {
  getWeather,
  formatCurrentWeather,
  formatHourlyForecast,
  formatDailyForecast
};