/**
 * Routing Verification Tool
 * 
 * This script will test all routes and verify they're working correctly
 * Run with Node.js: node verify-routing.js
 */

const http = require('http');

// List of routes to test
const routes = [
  '/',
  '/services',
  '/fleet',
  '/tour',
  '/rental',
  '/about',
  '/testimonials',
  '/offers',
  '/contact',
  '/ncc-ostuni',
  '/ncc-bari',
  '/ncc-salento',
  '/transfer-aeroporto-brindisi',
  '/autonoleggio-con-conducente-alberobello',
  '/tour-autista-privato-puglia',
  '/transfer-bari-ostuni',
  '/servizi-puglia'
];

// Test each route
async function testRoutes() {
  console.log('Testing routes...');
  console.log('='.repeat(50));
  
  // Local development server port
  const host = 'localhost';
  const port = 3000;
  
  for (const route of routes) {
    try {
      console.log(`Testing route: ${route}`);
      
      // Make a request to the route
      const response = await new Promise((resolve, reject) => {
        const req = http.get({
          host,
          port,
          path: route,
          headers: { 'User-Agent': 'Routing-Verification-Tool' }
        }, (res) => {
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, data }));
        });
        
        req.on('error', (err) => reject(err));
      });
      
      // Check if the response is successful
      if (response.statusCode >= 200 && response.statusCode < 400) {
        console.log(`✅ Route ${route} - Status: ${response.statusCode}`);
      } else {
        console.log(`❌ Route ${route} - Status: ${response.statusCode}`);
      }
    } catch (error) {
      console.log(`❌ Error testing route ${route}:`, error.message);
    }
    
    console.log('-'.repeat(50));
  }
  
  console.log('Route testing complete!');
}

// Run the tests
testRoutes()
  .catch(error => console.error('Error testing routes:', error));
