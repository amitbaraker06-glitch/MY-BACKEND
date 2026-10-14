s


const Mandi = require('../models/Mandi');

const getMandis = async (req, res) => {
  try {
    const mandis = await Mandi.find();
    res.json(mandis);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch mandis' });
  }
};

module.exports = { getMandis };