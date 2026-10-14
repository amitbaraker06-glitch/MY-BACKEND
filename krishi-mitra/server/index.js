import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const cropDetails = {
  paddy: {
    id: 'paddy',
    name: 'Paddy (Rice)',
    suitableSoilType: 'Clay, Clay Loam, Silty Clay',
    requiredPhRange: '5.5 - 7.0',
    requiredNpk: { n: 100, p: 50, k: 50 },
    waterRequirement: 'High (1200-1500 mm)',
    suitableTemperature: '20-35°C',
    growingSeason: 'Kharif (June-October)',
    expectedDuration: '120-150 days',
    irrigationRequirements: 'Maintain 5 cm standing water during vegetative stage; 2-3 cm during reproductive stage',
    fertilizerRequirements: 'N: 100 kg/ha, P2O5: 50 kg/ha, K2O: 50 kg/ha. Apply N in 3 splits: basal, tillering, panicle initiation',
    commonPestsDiseases: ['Brown Planthopper', 'Stem Borer', 'Leaf Blast', 'Bacterial Leaf Blight', 'Sheath Blight'],
    preventionMethods: ['Use resistant varieties', 'Proper water management', 'Balanced fertilization', 'Field sanitation', 'Crop rotation'],
    cultivationGuidelines: [
      'Prepare field with 2-3 plowings and puddling',
      'Transplant 21-25 day old seedlings at 20x15 cm spacing',
      'Maintain standing water for first 30 days',
      'Apply herbicides at 3-5 days after transplanting',
      'Monitor for pests weekly during vegetative stage',
      'Drain field 10-15 days before harvest',
    ],
  },
  maize: {
    id: 'maize',
    name: 'Maize (Corn)',
    suitableSoilType: 'Well-drained loamy soil',
    requiredPhRange: '5.8 - 7.0',
    requiredNpk: { n: 150, p: 75, k: 75 },
    waterRequirement: 'Moderate (500-800 mm)',
    suitableTemperature: '18-32°C',
    growingSeason: 'Kharif (June-Sept) / Rabi (Oct-Jan)',
    expectedDuration: '90-120 days',
    irrigationRequirements: 'Critical at knee-high, tasseling, and grain filling stages',
    fertilizerRequirements: 'N: 150 kg/ha, P2O5: 75 kg/ha, K2O: 75 kg/ha. Apply N in 2-3 splits',
    commonPestsDiseases: ['Fall Armyworm', 'Stem Borer', 'Downy Mildew', 'Leaf Blight', 'Rust'],
    preventionMethods: ['Early planting', 'Intercropping with legumes', 'Pheromone traps', 'Biological control with Trichogramma', 'Resistant hybrids'],
    cultivationGuidelines: [
      'Deep plowing 2-3 times before sowing',
      'Sow at 60x20 cm spacing, 3-5 cm depth',
      'Apply basal fertilizer at sowing',
      'Top dress N at knee-high and tasseling stage',
      'Weed control at 20 and 40 days after sowing',
      'Harvest at 20-25% moisture content',
    ],
  },
  groundnut: {
    id: 'groundnut',
    name: 'Groundnut (Peanut)',
    suitableSoilType: 'Sandy loam, well-drained',
    requiredPhRange: '6.0 - 7.5',
    requiredNpk: { n: 20, p: 40, k: 40 },
    waterRequirement: 'Moderate (450-650 mm)',
    suitableTemperature: '25-30°C',
    growingSeason: 'Kharif (June-Oct) / Summer (Jan-Apr)',
    expectedDuration: '100-130 days',
    irrigationRequirements: 'Critical at flowering, pegging, and pod development',
    fertilizerRequirements: 'Low N requirement (nitrogen-fixing). P2O5: 40 kg/ha, K2O: 40 kg/ha. Apply gypsum at flowering',
    commonPestsDiseases: ['Leaf Spot', 'Rust', 'Aphids', 'Thrips', 'Pod Borer'],
    preventionMethods: ['Crop rotation with cereals', 'Seed treatment with fungicide', 'Resistant varieties', 'Proper spacing for air circulation', 'Avoid overhead irrigation'],
    cultivationGuidelines: [
      'Fine tilth with 2-3 plowings',
      'Sow at 30x10 cm spacing, 4-5 cm depth',
      'Apply Rhizobium culture to seeds',
      'Gypsum application at 400 kg/ha at flowering',
      'Earthing up at 40-45 days after sowing',
      'Harvest when leaves turn yellow and pods rattle',
    ],
  },
};

const cropRecommendations = [
  { id: 'paddy', name: 'Paddy (Rice)', compatibility: 92, suitability: { soil: 'high', climate: 'high', water: 'high', season: 'high' }, reason: 'Excellent match for current soil moisture and Kharif season', expectedYield: '5-6 tons/ha', waterNeed: 'High', duration: '120-150 days' },
  { id: 'maize', name: 'Maize (Corn)', compatibility: 85, suitability: { soil: 'high', climate: 'high', water: 'medium', season: 'high' }, reason: 'Good compatibility with soil type and temperature range', expectedYield: '6-8 tons/ha', waterNeed: 'Moderate', duration: '90-120 days' },
  { id: 'groundnut', name: 'Groundnut (Peanut)', compatibility: 78, suitability: { soil: 'medium', climate: 'high', water: 'medium', season: 'medium' }, reason: 'Suitable for well-drained soils, nitrogen-fixing benefits', expectedYield: '2-3 tons/ha', waterNeed: 'Moderate', duration: '100-130 days' },
];

const soilData = {
  moisture: 65,
  ph: 6.8,
  nitrogen: 45,
  phosphorus: 32,
  potassium: 38,
  healthScore: 78,
};

const weatherData = {
  temperature: 28,
  humidity: 72,
  rainfall: 120,
  windSpeed: 12,
  condition: 'Partly Cloudy',
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/crops', (req, res) => {
  res.json(Object.values(cropDetails));
});

app.get('/api/crops/:id', (req, res) => {
  const crop = cropDetails[req.params.id];
  if (!crop) {
    return res.status(404).json({ error: 'Crop not found' });
  }
  res.json(crop);
});

app.get('/api/recommendations', (req, res) => {
  res.json(cropRecommendations);
});

app.get('/api/soil', (req, res) => {
  res.json(soilData);
});

app.get('/api/weather', (req, res) => {
  res.json(weatherData);
});

app.post('/api/analyze-soil', (req, res) => {
  const { moisture, ph, nitrogen, phosphorus, potassium } = req.body;
  const healthScore = Math.min(100, Math.max(0, 
    (moisture > 50 ? 20 : 10) +
    (ph >= 6 && ph <= 7.5 ? 25 : 15) +
    (nitrogen >= 40 ? 20 : 10) +
    (phosphorus >= 25 ? 20 : 10) +
    (potassium >= 30 ? 15 : 8)
  ));
  res.json({ healthScore, recommendations: ['Maintain optimal moisture', 'Consider organic matter'] });
});

app.listen(PORT, () => {
  console.log(`🌾 Krishi Mitra API Server running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Crops: http://localhost:${PORT}/api/crops`);
  console.log(`   Recommendations: http://localhost:${PORT}/api/recommendations`);
});