const express = require('express')
const router = express.Router()
router.post('/recommend', (req, res) => {
  const {crop, symptoms, growthStage} = req.body
  res.json({ success: true, crop, possibleProblems: [], recommendations: { inspection: [], prevention: [], culturalControl: [], biologicalControl: [], chemicalControl: [] } })
})
module.exports = router