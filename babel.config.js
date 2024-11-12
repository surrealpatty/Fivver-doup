module.exports = {
  presets: [
    [
      '@babel/preset-env', // For compiling modern JavaScript to a compatible version
      {
        targets: 'node 14', // Adjust for the version of Node.js you are using
        useBuiltIns: 'entry', // Ensures polyfills are added based on usage
        corejs: 3, // Version of corejs for polyfills
      },
    ],
    '@babel/preset-typescript', // To handle TypeScript syntax
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs', // Ensure compatibility with CommonJS modules
    '@babel/plugin-transform-runtime', // Optimize the runtime for async functions, generators, etc.
    '@babel/plugin-proposal-class-properties', // Handle class properties if you're using them
    '@babel/plugin-proposal-private-methods', // Handle private methods in classes
  ],
  sourceMaps: true, // Enable source maps to help with debugging
  comments: false, // Optionally remove comments in the output files
  overrides: [
    {
      test: /node_modules[\\/]uuid/, // Specific override for the uuid module
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs', // Ensure compatibility with Node.js modules
          },
        ],
      ],
    },
  ],
};
