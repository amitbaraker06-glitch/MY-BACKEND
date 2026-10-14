const mongoose = require('mongoose');

const mandiPriceSchema = new mongoose.Schema({
  cropName: String,
  pricePerKg: Number,
  mandi: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MandiPrice', mandiPriceSchema);
