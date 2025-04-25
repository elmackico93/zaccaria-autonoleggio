/**
 * Script to generate CSS variables from color-scheme.json
 * 
 * Usage: node config/generate-css-variables.js
 */

const fs = require('fs');
const path = require('path');
const colorScheme = require('./color-scheme.json');

// Start building the CSS variables string
let cssVariables = `:root {
  /* Monochromatic palette with metallic accents */
`;

// Add colors
Object.entries(colorScheme.colors).forEach(([name, value]) => {
  // Convert camelCase to kebab-case
  const cssName = name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  cssVariables += `  --${cssName}: ${value};\n`;
});

// Add gradients
cssVariables += `\n  /* Metallic accents */\n`;
Object.entries(colorScheme.gradients).forEach(([name, value]) => {
  const cssName = name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  cssVariables += `  --${cssName}: ${value};\n`;
});

// Add shadows
Object.entries(colorScheme.shadows).forEach(([name, value]) => {
  const cssName = name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  cssVariables += `  --${cssName}: ${value};\n`;
});

// Add UI elements
cssVariables += `\n  /* Highlight color for call button */\n`;
cssVariables += `  --highlight: ${colorScheme.ui.buttonHighlight};\n`;
cssVariables += `  --highlight-hover: ${colorScheme.ui.buttonHighlightHover};\n`;

// Add transitions
cssVariables += `\n  /* Transition speeds */\n`;
Object.entries(colorScheme.transitions).forEach(([name, value]) => {
  cssVariables += `  --transition-${name}: ${value};\n`;
});

// Close the root block
cssVariables += `}\n`;

// Write to file
const outputPath = path.join(__dirname, '../src/styles/variables.css');
try {
  fs.writeFileSync(outputPath, cssVariables);
  console.log(`CSS variables written to ${outputPath}`);
} catch (error) {
  console.error('Error writing CSS variables:', error);
}
