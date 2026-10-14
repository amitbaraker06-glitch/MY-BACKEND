// config/db.js
const mongoose = require('mongoose');
const path = require('path');
const dns = require('dns');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

/**
 * Connect to MongoDB with retry logic.
 * Does NOT call process.exit() — caller handles errors gracefully.
 */
const connectDB = async (retries = 3, delay = 5000) => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    const err = new Error('MONGO_URI is not defined in environment variables');
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }

  // Pre-validate DNS for SRV URIs
  if (mongoUri.startsWith('mongodb+srv://')) {
    try {
      const hostname = mongoUri.split('@')[1].split('/')[0];
      const srvHost = `_mongodb._tcp.${hostname}`;
      await new Promise((resolve, reject) => {
        dns.resolveSrv(srvHost, (err, addresses) => {
          if (err) reject(err);
          else resolve(addresses);
        });
      });
      console.log('   MongoDB SRV DNS resolution successful');
    } catch (dnsErr) {
      console.warn('⚠️  MongoDB SRV DNS pre-check failed:', dnsErr.message);
      console.warn('   Will still attempt connection with mongoose...');
    }
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(mongoUri, {
        // Mongoose 7+ connection options
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 15000,
        retryWrites: true,
        w: 'majority'
      });
      console.log('✅ MongoDB connected successfully');
      return mongoose.connection;
    } catch (err) {
      console.error(`❌ MongoDB connection error (attempt ${attempt}/${retries}):`, err.message);
      if (attempt < retries) {
        console.log(`   Retrying in ${delay / 1000} seconds...`);
        await new Promise(r => setTimeout(r, delay));
      } else {
        console.error('❌ All MongoDB connection attempts failed. Server will continue without database.');
        throw err; // Let caller decide whether to handle or crash
      }
    }
  }
};

module.exports = connectDB;