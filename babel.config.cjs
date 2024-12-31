module.exports = {
  presets: [
    '@babel/preset-env',            // Transpile modern JavaScript syntax
    '@babel/preset-typescript',     // Support for TypeScript
    '@babel/preset-react',          // If using React, add JSX support
  ],
  plugins: [
    '@babel/plugin-transform-runtime',   // For efficient runtime helpers
    [
      '@babel/plugin-proposal-decorators', // Allow decorator syntax
      {
        version: '2021-12',               // Use the latest decorators version
        decoratorsBeforeExport: true      // Ensure decorators are before exports
      }
    ],
    '@babel/plugin-proposal-class-properties', // Support for class properties
  ],
  overrides: [
    {
      test: /\.ts$/, // Apply additional plugins for TypeScript files
      plugins: [
        '@babel/plugin-proposal-decorators'
      ]
    }
  ],
};
