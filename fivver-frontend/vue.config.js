// vue.config.js
const { defineConfig } = require('@vue/cli-service');

// Base configuration object
const config = {
  transpileDependencies: [
    // List your dependencies here if needed
    // Example: 'dependency-name'
  ],
  // Uncomment and configure additional options as needed:
  // devServer: {
  //   port: 8080,
  //   proxy: 'http://localhost:3000',
  // },
};

// Use defineConfig if available, otherwise fall back to standard exports
module.exports = defineConfig ? defineConfig(config) : config;
