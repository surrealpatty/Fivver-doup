module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: '14' }, // Adjust Node target version
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    '@babel/preset-typescript', // Supports TypeScript syntax
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // Optimizes runtime
    '@babel/plugin-proposal-class-properties', // Supports public class properties
    '@babel/plugin-proposal-private-methods', // Supports private class methods
  ],
  sourceMaps: 'inline', // Useful for debugging
  comments: false, // Disable comments in the transpiled code for production
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { node: 'current' }, // Aligns with the current environment for Jest
          },
        ],
      ],
      plugins: [
        '@babel/plugin-transform-modules-commonjs', // Ensures Jest compatibility
      ],
    },
  },
  overrides: [
    {
      test: /\.(ts|tsx|js|jsx)$/, // Apply this preset to TypeScript and JavaScript files
      presets: ['@babel/preset-typescript'],
    },
    {
      test: /node_modules[\\/]uuid/, // Custom handling for uuid module
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { node: '14' }, // Matches Node version for uuid module-specific needs
            useBuiltIns: 'entry',
            corejs: 3, // Ensure that core-js is properly included for ESM libraries
          },
        ],
      ],
    },
  ],
};
