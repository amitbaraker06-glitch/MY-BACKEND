const express = require('express');
const router = express.Router();

// POST /api/analyze-soil - Analyze soil and provide recommendations
router.post('/', (req, res) => {
  const { soilType, phLevel, nitrogen, phosphorus, potassium, organicCarbon, cropType, location } = req.body;

  if (!soilType || !phLevel) {
    return res.status(400).json({ success: false, message: 'Soil type and pH level are required' });
  }

  // Determine fertilizer recommendations based on soil NPK and pH
  let fertilizerRecommendation;
  let irrigationRecommendation;

  const ph = parseFloat(phLevel);
  const n = nitrogen ? parseInt(nitrogen) : 0;
  const p = phosphorus ? parseInt(phosphorus) : 0;
  const k = potassium ? parseInt(potassium) : 0;
  const oc = organicCarbon ? parseFloat(organicCarbon) : 0;

  // Basic NPK-based recommendation logic
  if (n < 30 || p < 25 || k < 20) {
    fertilizerRecommendation = 'Apply balanced NPK fertilizer (10:26:26) at 50 kg/ha';
  } else if (n < 60) {
    fertilizerRecommendation = 'Apply Urea (46% N) at 30-40 kg/ha + DAP at 50 kg/ha';
  } else {
    fertilizerRecommendation = 'Crop nutrient requirements met. Monitor regularly.';
  }

  // pH-based recommendations
  let limingRecommendation = '';
  if (ph < 5.5) {
    limingRecommendation = 'Soil is acidic. Apply lime at 500-1000 kg/ha to raise pH';
  } else if (ph > 7.5) {
    limingRecommendation = 'Soil is alkaline. Consider sulfur application to lower pH';
  }

  // Crop-specific adjustments
  let cropAdjustment = '';
  const crop = cropType || 'General';
  switch (crop.toLowerCase()) {
    case 'rice':
      cropAdjustment = 'Rice requires additional potassium and organic matter';
      break;
    case 'wheat':
      cropAdjustment = 'Wheat benefits from sulfur application';
      break;
    case 'cotton':
      cropAdjustment = 'Cotton requires higher nitrogen during vegetative growth';
      break;
    default:
      cropAdjustment = 'Monitor crop-specific nutrient requirements';
  }

  const analysisResult = {
    soilType,
    phLevel: parseFloat(phLevel).toFixed(1),
    nitrogen,
    phosphorus,
    potassium,
    organicCarbon: oc ? parseFloat(oc).toFixed(1) : 'Not provided',
    cropType,
    location,
    fertilizerRecommendation,
    limingRecommendation,
    cropAdjustment,
    irrigationRecommendation: irrigationRecommendation || 'Based on local climate and soil moisture',
    analyzedAt: new Date().toISOString(),
    analysisCode: `AGRI-${Date.now().toString(36).toUpperCase().substring(0,6)}`
  };

  res.json({ success: true, analysis: analysisResult });
});

module.exports = router;