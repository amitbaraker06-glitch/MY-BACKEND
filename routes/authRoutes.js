const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn('⚠️ JWT_SECRET is not set. Authentication tokens will not be secure.');
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  next();
};

router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['farmer', 'vendor', 'admin']).withMessage('Invalid role')
], validate, async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: 'Email already registered' });
    const user = new User({ name, email, password, role: role || 'farmer', location });
    await user.save();
    const token = JWT_SECRET ? jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' }) : null;
    const userResponse = user.toObject(); delete userResponse.password;
    res.status(201).json({ success: true, message: 'Registration successful', token, user: userResponse });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], validate, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const token = JWT_SECRET ? jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' }) : null;
    const userResponse = user.toObject(); delete userResponse.password;
    res.json({ success: true, message: 'Login successful', token, user: userResponse });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'No token provided' });
    const token = authHeader.split(' ')[1];
    if (!JWT_SECRET) return res.status(500).json({ success: false, message: 'JWT_SECRET not configured' });
    let decoded;
    try { decoded = jwt.verify(token, JWT_SECRET); } catch (err) { return res.status(401).json({ success: false, message: 'Token invalid or expired' }); }
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
