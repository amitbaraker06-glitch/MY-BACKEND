/**
 * Crop Recommendation Service
 * Uses soil data, weather, and crop requirements to recommend crops
 */

const cropDatabase = {
  rice: {
    name: 'Rice',
    soilTypes: ['Alluvial Soil', 'Loamy Soil'],
    nRange: [60, 120],
    pRange: [5.5, 7.0],
    trange: [20, 35],
    hRange: [70, 90],
    rainfall: [1000, 2500],
    maturity: 120,
    description: 'Paddy rice cultivation'
  },
  wheat: {
    name: 'Wheat',
    soilTypes: ['Loamy Soil', 'Clay Soil', 'Black Soil'],
    nRange: [80, 150],
    pRange: [6.0, 7.5],
    trange: [10, 25],
    hRange: [60, 80],
    rainfall: [400, 900],
    maturity: 120,
    description: 'Winter wheat cultivation'
  },
  cotton: {
    name: 'Cotton',
    soilTypes: ['Black Soil', 'Loamy Soil'],
    nRange: [60, 100],
    pRange: [6.0, 7.5],
    trange: [20, 30],
    hRange: [60, 70],
    rainfall: [500, 1000],
    maturity: 180,
    description: 'Kharif crop'
  }
};

function getAllCrops() {
  return Object.keys(cropDatabase).map(key => ({
    id: Math.floor(Math.random() * 10000),
    name: cropDatabase[key].name,
    category: 'Crop'
  }));
}

module.exports = { getAllCrops, cropDatabase };