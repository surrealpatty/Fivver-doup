module.exports = {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "current",  // Ensure compatibility with the current Node version
          },
          modules: "auto",  // Automatically detect module system (ESM or CommonJS)
          // Ensure compatibility with ESM and CommonJS if using ES modules in the project
        },
      ],
      "@babel/preset-typescript", // Add TypeScript support
    ],
    plugins: [
      "@babel/plugin-transform-runtime", // Transforms async/await
    ],
    // Ensure Babel handles ESM and Node.js compatibility properly
    sourceType: "module", // Set Babel to treat files as modules
  };
  