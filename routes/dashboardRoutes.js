const express = require('express')
const router = express.Router()
router.get('/:farmerId', (req, res) => {
  res.json({ success: true, farmer: {}, latestSoil: null, soilHealth: null, weather: null, cropRecommendations: [], irrigation: null, fertilizer: null, pestAlerts: [], mandiPrices: [] })
})
module.exports = router