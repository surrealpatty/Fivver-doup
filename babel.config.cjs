module.exports = {
  presets: [
    '@babel/preset-env',            // Standard preset for modern JavaScript
    '@babel/preset-typescript',     // For handling TypeScript files
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // For handling async/await and other runtime features
  ],
  // Ensure Babel handles modules correctly (ESM support)
  sourceType: 'module',
};
