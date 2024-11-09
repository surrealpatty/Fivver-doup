module.exports = {
  presets: [
    '@babel/preset-env', // For compiling modern JavaScript to a compatible version
    '@babel/preset-typescript', // To handle TypeScript syntax
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs', // Ensure compatibility with CommonJS modules
    '@babel/plugin-transform-runtime', // Optimize the runtime for async functions, generators, etc.
  ],
  sourceMaps: true, // Enable source maps to help with debugging
  comments: false, // Optionally remove comments in the output files
};
