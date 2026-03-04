const express = require('express');
const router = express.Router();
const MandiPrice = require('../models/MandiPrice'); // Model import

// Get all mandi prices
router.get('/prices', async (req, res) => {
  const prices = await MandiPrice.find();
  res.json(prices);
});

// Add a new mandi price
router.post('/prices', async (req, res) => {
  const { cropName, pricePerKg, mandi } = req.body;
  const price = await MandiPrice.create({ cropName, pricePerKg, mandi });
  res.json(price);
});

module.exports = router;
