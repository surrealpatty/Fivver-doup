module.exports = {
  presets: [
    [
      '@babel/preset-env', // For compiling modern JavaScript to a compatible version
      {
        targets: 'node 14', // Target Node.js 14 (adjust to the version you use)
        useBuiltIns: 'entry', // Ensures polyfills are added
        corejs: 3, // Version of corejs for polyfills
      },
    ],
    '@babel/preset-typescript', // To handle TypeScript syntax
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs', // Ensure compatibility with CommonJS modules
    '@babel/plugin-transform-runtime', // Optimize the runtime for async functions, generators, etc.
    '@babel/plugin-proposal-class-properties', // Handle class properties if you're using them
    // Optional: Uncomment if using private methods or fields
    // '@babel/plugin-proposal-private-methods', 
  ],
  sourceMaps: true, // Enable source maps to help with debugging
  comments: false, // Optionally remove comments in the output files
};
