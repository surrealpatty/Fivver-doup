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
    '@babel/preset-typescript', // Handle TypeScript syntax
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // Optimizes runtime for async functions, generators, etc.
    '@babel/plugin-proposal-class-properties', // Supports class properties
    '@babel/plugin-proposal-private-methods', // Supports private methods in classes
  ],
  sourceMaps: 'inline', // Easier debugging with inline source maps
  comments: false,
  env: {
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs', // Ensure Jest compatibility with CommonJS modules
      ],
    },
  },
  overrides: [
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
