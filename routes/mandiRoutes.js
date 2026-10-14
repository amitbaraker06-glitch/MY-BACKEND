const express = require('express')
const router = express.Router()
router.get('/prices', (req, res) => {
  res.json({ success: false, live: false, message: 'Mandi price data currently unavailable' })
})
module.exports = router