// Script to create necessary files for Next.js startup
const fs = require('fs');
const path = require('path');

// Path to the .next directory
const nextDir = path.join(process.cwd(), '.next');

// Check if .next directory exists
if (!fs.existsSync(nextDir)) {
  console.log('.next directory not found. Please run "npm run build" first.');
  process.exit(1);
}

// Create empty prerender-manifest.json if it doesn't exist
const prerenderManifestPath = path.join(nextDir, 'prerender-manifest.json');
if (!fs.existsSync(prerenderManifestPath)) {
  console.log('Creating empty prerender-manifest.json...');
  fs.writeFileSync(prerenderManifestPath, JSON.stringify({
    version: 3,
    routes: {},
    dynamicRoutes: {},
    preview: {
      previewModeId: "development-id",
      previewModeSigningKey: "development-key",
      previewModeEncryptionKey: "development-key"
    }
  }, null, 2));
  console.log('Created prerender-manifest.json');
}

// Create empty build-manifest.json if it doesn't exist
const buildManifestPath = path.join(nextDir, 'build-manifest.json');
if (!fs.existsSync(buildManifestPath)) {
  console.log('Creating empty build-manifest.json...');
  fs.writeFileSync(buildManifestPath, JSON.stringify({
    polyfillFiles: [],
    devFiles: [],
    ampDevFiles: [],
    lowPriorityFiles: [],
    rootMainFiles: [],
    pages: {
      "/_app": [],
      "/": []
    },
    ampFirstPages: []
  }, null, 2));
  console.log('Created build-manifest.json');
}

console.log('Preprocessing complete. You can now run "npm run start".');
