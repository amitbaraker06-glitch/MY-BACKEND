const express = require('express');
const router = express.Router();

// Temporary stub routes
router.post('/users', (req, res) => res.status(201).json({ ok: true }));
router.get('/users', (req, res) => res.json([]));
router.get('/users/:id', (req, res) => res.json({}));
router.put('/users/:id', (req, res) => res.json({}));
router.delete('/users/:id', (req, res) => res.json({}));

module.exports = router;
