const mongoose = require('mongoose');

const mandiSchema = new mongoose.Schema({
  name: String,
  crop: String,
  price: Number
});

module.exports = mongoose.model('Mandi', mandiSchema);