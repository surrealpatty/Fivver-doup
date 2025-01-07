module.exports = {
  presets: [
    '@babel/preset-env',  // Transpile modern JavaScript
    '@babel/preset-typescript',  // Handle TypeScript
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // Use helpers for async/await, etc.
    [
      '@babel/plugin-proposal-decorators', // Handle TypeScript decorators
      {
        version: '2021-12',  // Use latest decorator version
        decoratorsBeforeExport: true,  // Place decorators before export statements
      },
    ],
    '@babel/plugin-proposal-class-properties',  // Handle class properties (e.g., public/private fields)
    '@babel/plugin-transform-modules-commonjs',  // Convert ES Modules to CommonJS
  ],
  overrides: [
    {
      test: /\.ts$/,  // Apply to TypeScript files
      plugins: [
        ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],  // Apply decorators plugin for TypeScript
      ],
    },
  ],
};
