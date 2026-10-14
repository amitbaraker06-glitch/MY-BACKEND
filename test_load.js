/** Fertilizer service test */
try {
  const s = require('./services/fertilizerService');
  console.log('Module loaded successfully');
  console.log('Exports:', Object.keys(s));
  console.log('getFertilizerRecommendation type:', typeof s.getFertilizerRecommendation);
  console.log('getOrganicAlternatives type:', typeof s.getOrganicAlternatives);
  
  // Test the function with Maize crop
  const result = s.getFertilizerRecommendation('Maize', 35, 20, 40);
  console.log('\\nTest: getFertilizerRecommendation(\"Maize\", 35, 20, 40)');
  console.log('Result:', JSON.stringify(result, null, 2));
  
  // Test with wheat
  const result2 = s.getFertilizerRecommendation('Wheat', 50, 30, 40);
  console.log('\\nTest: getFertilizerRecommendation(\"Wheat\", 50, 30, 40)');
  console.log('Result:', JSON.stringify(result2, null, 2));
  
  // Test with unknown crop
  const result3 = s.getFertilizerRecommendation('UnknownCrop', 35, 20, 40);
  console.log('\\nTest: getFertilizerRecommendation(\"UnknownCrop\", 35, 20, 40)');
  console.log('Result:', JSON.stringify(result3, null, 2));
  
  // Test organic alternatives
  console.log('\\ngetOrganicAlternatives(\"Maize\"):', s.getOrganicAlternatives('Maize'));
} catch(e) {
  console.log('Error:', e.message);
}