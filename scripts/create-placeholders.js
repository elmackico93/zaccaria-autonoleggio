const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');

// Create directories if they don't exist
const dirs = [
  IMAGES_DIR,
  path.join(IMAGES_DIR, 'favicons'),
  path.join(IMAGES_DIR, 'logo')
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Create placeholder image files
const files = [
  { path: path.join(IMAGES_DIR, 'service-cars.jpg'), content: 'PLACEHOLDER_IMAGE' },
  { path: path.join(IMAGES_DIR, 'tour-puglia.jpg'), content: 'PLACEHOLDER_IMAGE' },
  { path: path.join(IMAGES_DIR, 'rental-cars.jpg'), content: 'PLACEHOLDER_IMAGE' }
];

files.forEach(file => {
  if (!fs.existsSync(file.path)) {
    fs.writeFileSync(file.path, file.content);
    console.log(`Created placeholder: ${file.path}`);
  }
});

console.log('Created all necessary placeholder images');
