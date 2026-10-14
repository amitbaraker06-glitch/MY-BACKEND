/** Farm Advisory Service */
const router = require('express').Router()

router.post('/advisory', (req, res) => {
  res.json({ success: true, message: 'Farm advisory - service integration pending' })
})

module.exports = router