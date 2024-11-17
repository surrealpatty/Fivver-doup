module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: '14' },  // Ensure compatibility with Node 14 for production
        useBuiltIns: 'entry',     // Automatically import necessary polyfills
        corejs: 3,                // Use core-js version 3 for polyfills
      },
    ],
    '@babel/preset-typescript',   // Supports TypeScript syntax
  ],
  plugins: [
    '@babel/plugin-transform-runtime',  // Avoids duplication of runtime code
    '@babel/plugin-transform-class-properties',  // Updated plugin
    '@babel/plugin-transform-private-methods',  // Updated plugin
    '@babel/plugin-transform-modules-commonjs', // Ensures compatibility with Jest (CommonJS modules)
  ],
  sourceMaps: 'inline',    // Useful for debugging
  comments: false,         // Disable comments in production code
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { node: 'current' }, // Ensures compatibility with the current version of Node.js for Jest
            useBuiltIns: 'entry',         // Automatically import polyfills for Jest tests
            corejs: 3,                    // Ensure polyfills are included for Jest
          },
        ],
      ],
    },
  },
  overrides: [
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
