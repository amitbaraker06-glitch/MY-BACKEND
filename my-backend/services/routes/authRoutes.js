const express = require('express');
const router = express.Router();

// Dummy Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // For testing, accept any credentials
  res.json({ id: 1, name: 'Test User', email });
});

// Dummy Signup Route
router.post('/signup', (req, res) => {
  const { name, email, phone, role, location, password } = req.body;
  res.json({ id: 2, name, email, phone, role, location });
});

// Dummy Mandi Prices
router.get('/mandi-prices', (req, res) => {
  res.json([
    { crop: 'Wheat', price: 2000 },
    { crop: 'Rice', price: 3000 }
  ]);
});

module.exports = router;
