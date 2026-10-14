const express = require('express')
const router = express.Router()
const { getFertilizerRecommendation, getOrganicAlternatives } = require('../services/fertilizerService')

router.post('/recommend', (req, res) => {
  const {crop, nitrogen, phosphorus, potassium, ph} = req.body

  // Validate required inputs
  if (!crop) {
    return res.status(400).json({ success: false, message: 'Crop name is required' })
  }

  if (nitrogen === undefined || phosphorus === undefined || potassium === undefined) {
    return res.status(400).json({ success: false, message: 'Nitrogen, phosphorus, and potassium soil levels are required' })
  }

  // Call the fertilizer recommendation service
  const result = getFertilizerRecommendation(crop, nitrogen, phosphorus, potassium)

  if (result.error) {
    return res.status(400).json({ success: false, message: result.error })
  }

  // Add organic alternatives
  const organic = getOrganicAlternatives(crop)

  res.json({
    success: true,
    crop: result.crop,
    recommendations: result.recommendations,
    deficiencies: result.deficiencies,
    organicAlternatives: organic,
    warnings: result.warnings
  })
})

module.exports = router