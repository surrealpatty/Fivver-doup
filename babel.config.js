module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',  // Ensures compatibility with the current Node version
        },
        modules: 'auto',  // Automatically detect module system (ESM or CommonJS)
      },
    ],
    '@babel/preset-typescript',  // Adds TypeScript support
  ],
  plugins: [
    '@babel/plugin-transform-runtime',  // Transforms async/await
  ],
  sourceType: 'unambiguous',  // Ensures Babel handles both ESM and CommonJS compatibility properly
};
