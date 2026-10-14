const express = require('express');
const router = express.Router();

// GET /api/crops - List crops
router.get('/', (req, res) => {
  const crops = [
    { id: 1, name: 'Rice', category: 'Grain', season: 'Kharif', description: 'Paddy rice cultivation' },
    { id: 2, name: 'Wheat', category: 'Grain', season: 'Rabi', description: 'Winter wheat cultivation' },
    { id: 3, name: 'Sugarcane', category: 'Cash crop', season: 'Year-round', description: 'Sugar production' },
    { id: 4, name: 'Cotton', category: 'Fiber', season: 'Kharif', description: 'Cotton cultivation' },
    { id: 5, name: 'Groundnut', category: 'Oilseed', season: 'Kharif', description: 'Peanut cultivation' },
    { id: 6, name: 'Vegetables', category: 'Mixed', season: 'Year-round', description: 'Mixed vegetable cultivation' }
  ];
  res.json({ success: true, crops });
});

// GET /api/crops/:id - Get crop details
router.get('/:id', (req, res) => {
  const cropId = parseInt(req.params.id);
  const crops = [
    { id: 1, name: 'Rice', category: 'Grain', season: 'Kharif', description: 'Paddy rice cultivation' },
    { id: 2, name: 'Wheat', category: 'Grain', season: 'Rabi', description: 'Winter wheat cultivation' },
    { id: 3, name: 'Sugarcane', category: 'Cash crop', season: 'Year-round', description: 'Sugar production' },
    { id: 4, name: 'Cotton', category: 'Fiber', season: 'Kharif', description: 'Cotton cultivation' },
    { id: 5, name: 'Groundnut', category: 'Oilseed', season: 'Kharif', description: 'Peanut cultivation' },
    { id: 6, name: 'Vegetables', category: 'Mixed', season: 'Year-round', description: 'Mixed vegetable cultivation' }
  ];
  const crop = crops.find(c => c.id === cropId) || null;
  res.json({ success: true, crop });
});

module.exports = router;