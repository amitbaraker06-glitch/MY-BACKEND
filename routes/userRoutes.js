const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middlewares/auth');
const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  next();
};

router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Access denied' });
    const users = await User.find().select('-password').sort('-createdAt');
    res.json({ success: true, users });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/:id', auth, async (req, res) => {
  try { const user = await User.findById(req.params.id).select('-password'); if (!user) return res.status(404).json({ success: false, message: 'User not found' }); res.json({ success: true, user }); } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put('/:id', auth, [ body('name').optional().trim().notEmpty(), body('email').optional().isEmail(), body('location').optional().trim() ], validate, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) return res.status(403).json({ success: false, message: 'Access denied' });
    const updates = { ...req.body }; delete updates.password; delete updates.role;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try { if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Access denied' }); const user = await User.findByIdAndDelete(req.params.id).select('-password'); if (!user) return res.status(404).json({ success: false, message: 'User not found' }); res.json({ success: true, message: 'User deleted', user }); } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
