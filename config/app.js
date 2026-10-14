// config/app.js
// Main express app configuration and server start

const path = require('path');
const dotenv = require('dotenv');

// Load environment variables first (so process.env is available below)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');
const morgan = require('morgan');

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 4000;

// --------------------
// DNS configuration (optional)
// --------------------
if (process.env.NODE_DNS_SERVERS) {
  const servers = process.env.NODE_DNS_SERVERS.split(',').map(s => s.trim());
  try {
    dns.setServers(servers);
    console.log(`   DNS servers set to: ${servers.join(', ')}`);
  } catch (e) {
    console.warn('Could not set DNS servers:', e.message);
  }
} else {
  try { dns.setServers(['8.8.8.8', '1.1.1.1']); } catch (e) {}
}

// --------------------
// Middleware
// --------------------
const corsOrigin = process.env.FRONTEND_ORIGIN || '*';
const corsOptions = {
  origin: corsOrigin,
  ...(corsOrigin !== '*' && { credentials: true })
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('short'));

// --------------------
// MongoDB connection (non-blocking)
// --------------------
const connectDB = require('./db');

let mongoError = null;

mongoose.connection.on('connected', () => { mongoError = null; console.log('✅ MongoDB connected'); });
mongoose.connection.on('disconnected', () => { console.warn('⚠️ MongoDB disconnected'); });
mongoose.connection.on('error', (err) => { mongoError = err.message; console.error('❌ MongoDB connection error:', err.message); });

connectDB().catch(err => {
  console.error('❌ MongoDB initial connection attempt failed:', err.message);
  mongoError = err.message;
});

// --------------------
// Routes
// --------------------
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const weatherRoutes = require('../routes/weatherRoutes');
const soilRoutes = require('../routes/soilRoutes');
const cropsRoutes = require('../routes/cropsRoutes');
const recommendationsRoutes = require('../routes/recommendationsRoutes');
const analyzeSoilRoutes = require('../routes/analyzeSoilRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/soil', soilRoutes);
app.use('/api/crops', cropsRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/analyze-soil', analyzeSoilRoutes);

app.use('/api/fertilizer', require('../routes/fertilizerRoutes'));
app.use('/api/pests', require('../routes/pestRoutes'));
app.use('/api/mandi', require('../routes/mandiRoutes'));
app.use('/api/farm', require('../routes/farmRoutes'));
app.use('/api/dashboard', require('../routes/dashboardRoutes'));

// --------------------
// Health & root
// --------------------
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Krishi-Mitra API', version: '1.0.0', environment: process.env.NODE_ENV || 'development' });
});

app.get('/api/ping', (req, res) => res.json({ success: true, message: 'pong' }));

app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? 'connected' : dbState === 2 ? 'connecting' : 'disconnected';
  res.json({ success: true, message: 'Krishi-Mitra API is running', environment: process.env.NODE_ENV || 'development', timestamp: new Date().toISOString(), uptime: Math.floor(process.uptime()), database: dbStatus, databaseError: mongoError, memoryUsage: process.memoryUsage(), nodeVersion: process.version });
});

// --------------------
// Error handling & 404
// --------------------
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal server error', ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) });
});

app.use((req, res) => { res.status(404).json({ success: false, message: 'Route not found' }); });

// --------------------
// Start server
// --------------------
const server = app.listen(PORT, '0.0.0.0', () => {
  const addr = server.address();
  console.log(`🚀 Server running on port ${addr.port}`);
  console.log(`   Bound to: ${addr.address}:${addr.port}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Health: http://0.0.0.0:${addr.port}/api/health`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => { mongoose.connection.close(false, () => { console.log('MongoDB connection closed.'); process.exit(0); }); });
});

module.exports = app;
