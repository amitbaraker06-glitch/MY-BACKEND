// --------------------
// Import required modules
// --------------------
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const morgan = require('morgan');
const path = require('path');

// --------------------
// DNS Configuration for MongoDB SRV resolution
// --------------------
// The system DNS may not support SRV record lookups (ECONNREFUSED).
// Override with reliable public DNS servers for MongoDB SRV resolution.
if (process.env.NODE_DNS_SERVERS) {
  const servers = process.env.NODE_DNS_SERVERS.split(',').map(s => s.trim());
  dns.setServers(servers);
  console.log(`   DNS servers set to: ${servers.join(', ')}`);
} else {
  // Fallback: use Google and Cloudflare DNS for reliable SRV resolution
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (e) {
    // Some environments restrict DNS server changes; fall through silently
  }
}

// --------------------
// Configurations
// --------------------
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Load environment variables
const app = express();
const PORT = parseInt(process.env.PORT, 10) || 4000;

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
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('short'));

// --------------------
// MongoDB Connection (non-blocking)
// --------------------
const connectDB = require('./db');

// Track MongoDB connection state for health checks
let mongoConnected = false;
let mongoError = null;

mongoose.connection.on('connected', () => {
  mongoConnected = true;
  mongoError = null;
  console.log('✅ MongoDB connected');
});
mongoose.connection.on('disconnected', () => {
  mongoConnected = false;
  console.log('⚠️ MongoDB disconnected');
});
mongoose.connection.on('error', (err) => {
  mongoConnected = false;
  mongoError = err.message;
  console.error('❌ MongoDB connection error:', err.message);
});

// Attempt MongoDB connection (do not crash the server if it fails)
connectDB().catch(err => {
  console.error('❌ MongoDB initial connection failed:', err.message);
  mongoError = err.message;
  // Server keeps running — health endpoint will report DB status
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

// Fertilizer routes
app.use('/api/fertilizer', require('../routes/fertilizerRoutes'));

// Pest routes
app.use('/api/pests', require('../routes/pestRoutes'));

// Mandi routes
app.use('/api/mandi', require('../routes/mandiRoutes'));

// Farm advisory routes
app.use('/api/farm', require('../routes/farmRoutes'));

// Dashboard routes
app.use('/api/dashboard', require('../routes/dashboardRoutes'));

// --------------------
// Health Check — includes MongoDB status
// --------------------
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Krishi-Mitra API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/ping', (req, res) => res.json({ success: true, message: 'pong' }));

app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const dbStatus = dbState === 1 ? 'connected' : dbState === 2 ? 'connecting' : 'disconnected';

  res.json({
    success: true,
    message: 'Krishi-Mitra API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    database: dbStatus,
    databaseError: mongoError,
    memoryUsage: process.memoryUsage(),
    nodeVersion: process.version
  });
});

// --------------------
// Error Handling Middleware
// --------------------
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// --------------------
// 404 Handler
// --------------------
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// --------------------
// Start Server — bind to 0.0.0.0 for external access
// --------------------
const server = app.listen(PORT, '0.0.0.0', () => {
  const addr = server.address();
  console.log(`🚀 Server running on port ${addr.port}`);
  console.log(`   Bound to: ${addr.address}:${addr.port}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Health: http://0.0.0.0:${addr.port}/api/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed.');
      process.exit(0);
    });
  });
});

module.exports = app;