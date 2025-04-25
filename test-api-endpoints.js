/**
 * API Endpoints Test Script
 * Run with: node test-api-endpoints.js
 * 
 * This script will help verify that the API endpoints are correctly set up
 */

const http = require('http');

console.log("=== API Endpoints Test ===");

// Function to test an endpoint
function testEndpoint(path) {
  return new Promise((resolve) => {
    console.log(`Testing endpoint: ${path}`);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
    };
    
    const req = http.request(options, (res) => {
      console.log(`Status code: ${res.statusCode}`);
      resolve(res.statusCode);
    });
    
    req.on('error', (error) => {
      console.error(`Error testing ${path}:`, error.message);
      resolve(null);
    });
    
    req.end();
  });
}

// Main test function
async function runTests() {
  console.log("\nTesting section routes:");
  for (const section of ['fleet', 'services', 'tour', 'about', 'contact', 'offers']) {
    await testEndpoint(`/${section}`);
  }
  
  console.log("\nTesting SEO pages:");
  for (const page of ['ncc-bari', 'servizi-puglia']) {
    await testEndpoint(`/${page}`);
  }
  
  console.log("\nNOTE: The API routes like /api/vitals should return 404 when accessed via GET");
  console.log("because they're designed for POST requests only. This is expected behavior.");
  
  console.log("\nTo properly test the API endpoints:");
  console.log("1. Run the application with 'npm run dev'");
  console.log("2. Navigate to different section pages (e.g., /fleet, /services)");
  console.log("3. Navigate to SEO pages (e.g., /ncc-bari)");
  console.log("4. Check that no 404 errors appear in the console");
  
  console.log("\nIf the tests pass with 200 status codes, your routing is correctly set up!");
}

// Run the tests
runTests();
