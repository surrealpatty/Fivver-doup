module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: '14' }, // Ensure compatibility with Node 14
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    '@babel/preset-typescript', // Handles TypeScript syntax
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // Optimizes runtime for async functions, generators, etc.
    '@babel/plugin-proposal-class-properties', // Supports class properties
    '@babel/plugin-proposal-private-methods', // Supports private methods in classes
  ],
  sourceMaps: 'inline', // Enables inline source maps for easier debugging
  comments: false,
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { node: 'current' }, // Ensures compatibility with the current Node version for testing
          },
        ],
      ],
      plugins: [
        '@babel/plugin-transform-modules-commonjs', // Ensures Jest compatibility with CommonJS modules
      ],
    },
  },
  overrides: [
    {
      test: /\.(ts|tsx|js|jsx)$/, // Applies Babel config to both TS and JS files
      presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
      ],
    },
    {
      test: /node_modules[\\/]uuid/, // Specific handling for the uuid module
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
          },
        ],
      ],
    },
  ],
};
