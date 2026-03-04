// Example to fetch real-time mandi prices from an API
const axios = require('axios');
const MandiPrice = require('../models/MandiPrice');

const fetchPrices = async () => {
  try {
    const { data } = await axios.get('https://example.com/mandi-prices-api');
    for(const item of data) {
      await MandiPrice.updateOne(
        { cropName: item.cropName, mandi: item.mandi },
        { $set: { pricePerKg: item.pricePerKg, date: new Date() } },
        { upsert: true }
      );
    }
  } catch(err) {
    console.error('Error fetching prices:', err.message);
  }
};

module.exports = fetchPrices;
