module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: '14' }, // Adjust Node target version (for production)
        useBuiltIns: 'entry', // Automatically imports necessary polyfills
        corejs: 3, // Use core-js version 3
      },
    ],
    '@babel/preset-typescript', // Supports TypeScript syntax
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // Optimizes runtime (avoid duplication)
    '@babel/plugin-proposal-class-properties', // Allows public class properties
    '@babel/plugin-proposal-private-methods', // Allows private class methods
  ],
  sourceMaps: 'inline', // Useful for debugging
  comments: false, // Disable comments in the transpiled code (for production)
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { node: 'current' }, // Ensures compatibility with the current version of Node.js for Jest
            useBuiltIns: 'entry', // Automatically imports necessary polyfills for testing
            corejs: 3,
          },
        ],
      ],
      plugins: [
        '@babel/plugin-transform-modules-commonjs', // Ensures Jest compatibility for ESM modules
      ],
    },
  },
  overrides: [
    {
      test: /\.(ts|tsx|js|jsx)$/, // Applies to TypeScript and JavaScript files
      presets: ['@babel/preset-typescript'], // Use TypeScript preset for these files
    },
    {
      test: /node_modules[\\/]uuid/, // Special handling for the 'uuid' package
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { node: '14' }, // Matches Node version for uuid-specific needs
            useBuiltIns: 'entry',
            corejs: 3, // Ensures polyfills are properly included for 'uuid'
          },
        ],
      ],
    },
  ],
};
