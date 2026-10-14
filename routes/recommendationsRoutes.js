const express = require('express');
const router = express.Router();

// GET /api/recommendations - Get crop recommendations based on soil and weather
router.get('/', (req, res) => {
  const recommendations = [
    {
      id: 1,
      crop: 'Rice',
      soilType: 'Clay loam',
      phLevel: 6.5,
      nitrogen: 'Medium',
      phosphorus: 'Medium',
      potassium: 'Medium',
      suggestedFertilizer: 'Urea + DAP',
      applicationRate: '50-60 kg/ha',
      timing: 'At sowing',
      weatherConditions: 'Moderate rainfall required',
      irrigationRequired: 'Yes, 1000-1200 mm'
    },
    {
      id: 2,
      crop: 'Wheat',
      soilType: 'Sandy loam',
      phLevel: 7.0,
      nitrogen: 'High',
      phosphorus: 'Medium',
      potassium: 'Medium',
      suggestedFertilizer: 'DAP + MOP',
      applicationRate: '45-55 kg/ha',
      timing: 'At sowing + top dressing',
      weatherConditions: 'Cool growing season',
      irrigationRequired: 'Yes, 400-500 mm'
    },
    {
      id: 3,
      crop: 'Sugarcane',
      soilType: 'Loamy',
      phLevel: 6.0,
      nitrogen: 'High',
      phosphorus: 'Medium',
      potassium: 'High',
      suggestedFertilizer: 'NPK 15:15:15',
      applicationRate: '120-150 kg/ha',
      timing: 'At planting + 3 split applications',
      weatherConditions: 'Sufficient soil moisture',
      irrigationRequired: 'Yes, frequent irrigation'
    }
  ];
  res.json({ success: true, recommendations });
});

module.exports = router;