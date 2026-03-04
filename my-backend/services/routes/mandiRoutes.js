const express = require('express');
const router = express.Router();

router.get('/mandi', (req, res) => {
  console.log(`[${new Date().toISOString()}] /api/mandi hit from ${req.ip}`);
  res.status(200).json({ message: 'Mandi route is working!' });
});

module.exports = router;