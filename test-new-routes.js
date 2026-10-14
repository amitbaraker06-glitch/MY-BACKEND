const http = require('http');

// Test GET /api/crops
function testGetCrops() {
  return new Promise((resolve) => {
    http.get({ hostname: 'localhost', port: 4000, path: '/api/crops' }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(data);
          console.log('GET /api/crops:', res.statusCode, j.success ? 'SUCCESS' : 'FAILED');
        } catch (e) {
          console.log('GET /api/crops:', res.statusCode, 'RAW:', data.substring(0, 80));
        }
        resolve();
      });
    }).on('error', (e) => {
      console.log('GET /api/crops ERROR:', e.message);
      resolve();
    });
  });
}

// Test GET /api/recommendations
function testGetRecommendations() {
  return new Promise((resolve) => {
    http.get({ hostname: 'localhost', port: 4000, path: '/api/recommendations' }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(data);
          console.log('GET /api/recommendations:', res.statusCode, j.success ? 'SUCCESS' : 'FAILED');
        } catch (e) {
          console.log('GET /api/recommendations:', res.statusCode, 'RAW:', data.substring(0, 80));
        }
        resolve();
      });
    }).on('error', (e) => {
      console.log('GET /api/recommendations ERROR:', e.message);
      resolve();
    });
  });
}

// Test POST /api/analyze-soil
function testPostAnalyzeSoil() {
  return new Promise((resolve) => {
    const data = JSON.stringify({ soilType: 'Loamy', phLevel: 6.5, nitrogen: 'Medium', phosphorus: 'Medium', potassium: 'Medium', cropType: 'Rice' });
    const req = http.request({ hostname: 'localhost', port: 4000, path: '/api/analyze-soil', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': data.length } }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(data);
          console.log('POST /api/analyze-soil:', res.statusCode, j.success ? 'SUCCESS' : 'FAILED');
          if (j.success) console.log('  Analysis:', j.analysis ? 'has results' : 'none');
        } catch (e) {
          console.log('POST /api/analyze-soil:', res.statusCode, 'RAW:', data.substring(0, 80));
        }
        resolve();
      });
    });
    req.write(data);
    req.end();
  });
}

(async () => {
  console.log('=== Testing Krishi-Mitra Backend New Endpoints ===\n');
  await testGetCrops();
  await testGetRecommendations();
  await testPostAnalyzeSoil();
  console.log('\n=== All Tests Complete ===');
})();