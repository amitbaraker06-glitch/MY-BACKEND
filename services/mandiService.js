/** Mandi/Market Price Service */
const mandiDatabase = {
  rice: {
    andhraPradesh: {
      vijayawada: ['1850', '1900', '1950'],
      guntur: ['1800', '1850', '1900']
    },
    karnataka: {
      bangalore: ['1780', '1830', '1880'],
      mysore: ['1750', '1800', '1850']
    },
    default: ['1800', '1850', '1900']
  },
  wheat: {
    uttarPradesh: {
      lucknow: ['2100', '2150', '2200'],
      kanpur: ['2050', '2100', '2150']
    },
    madhyaPradesh: {
      bhopal: ['2080', '2130', '2180'],
      indore: ['2070', '2120', '2170']
    },
    default: ['2050', '2100', '2150']
  },
  maize: {
    karnataka: {
      belgaum: ['1650', '1700', '1750'],
      bangalore: ['1600', '1650', '1700']
    },
    default: ['1600', '1650', '1700']
  },
  cotton: {
    gujarat: {
      surat: ['55000', '56000', '57000'],
      rajkot: ['54000', '55000', '56000']
    },
    maharashtra: {
      mumbai: ['53000', '54000', '55000'],
      pune: ['52000', '53000', '54000']
    },
    default: ['53000', '54000', '55000']
  },
  soybean: {
    madhyaPradesh: {
      indore: ['3200', '3300', '3400'],
      ujjain: ['3100', '3200', '3300']
    },
    maharashtra: {
      nashik: ['3150', '3250', '3350']
    },
    default: ['3100', '3200', '3300']
  }
}

function getMandiPrices(crop, state, district, market) {
  const cropData = mandiDatabase[crop.toLowerCase()]
  if (!cropData) {
    return { success: false, live: false, message: 'Mandi price data currently unavailable' }
  }

  const stateData = cropData[state.toLowerCase()]
  if (!stateData) {
    return { success: false, live: false, message: 'Mandi price data currently unavailable' }
  }

  const marketData = stateData[market.toLowerCase()]
  if (!marketData) {
    return { success: false, live: false, message: 'Mandi price data currently unavailable' }
  }

  // Return sample data with disclaimer
  return {
    success: false,
    live: false,
    message: 'Mandi price data currently unavailable',
    sample: {
      crop,
      state,
      district,
      market,
      prices: marketData.map(p => parseInt(p)),
      dateRange: 'Sample data - not live market data',
      source: 'Sample database only'
    }
  }
}

function getSupportedCrops() {
  return Object.keys(mandiDatabase)
}

function getSupportedStates(crop) {
  const cropData = mandiDatabase[crop.toLowerCase()]
  if (!cropData) return []
  return Object.keys(cropData)
}

module.exports = { getMandiPrices, getSupportedCrops, getSupportedStates }