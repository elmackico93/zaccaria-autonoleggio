const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Check if required dev dependencies are installed
const requiredDevDeps = {
  "@types/node": "^20.0.0"
};

let needsInstall = false;
const depsToInstall = [];

Object.entries(requiredDevDeps).forEach(([dep, version]) => {
  if (!packageJson.devDependencies || !packageJson.devDependencies[dep]) {
    needsInstall = true;
    depsToInstall.push(`${dep}@${version}`);
  }
});

if (needsInstall) {
  console.log('Installing required dev dependencies:', depsToInstall.join(', '));
  try {
    execSync(`npm install --save-dev ${depsToInstall.join(' ')}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to install dependencies:', error);
    process.exit(1);
  }
}

// Add the script to package.json if not already present
if (!packageJson.scripts || !packageJson.scripts['update-hero']) {
  console.log('Adding update-hero script to package.json');
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts['update-hero'] = 'node -r @/register src/scripts/modify-hero.js';
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// Create register.js if it doesn't exist
const registerPath = path.join(process.cwd(), 'register.js');
if (!fs.existsSync(registerPath)) {
  console.log('Creating register.js for module resolution');
  fs.writeFileSync(registerPath, `
// This file enables ES modules in Node.js for the scripts
require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: [
    ['module-resolver', {
      root: ['.'],
      alias: {
        '@': './src',
      },
    }],
  ],
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});
  `);
}

console.log('Setup complete!');
