
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
  