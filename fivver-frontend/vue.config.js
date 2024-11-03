const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [
    // Include dependencies that need to be transpiled here, e.g., 'dependency-name'
  ],
  // Uncomment and configure additional options as needed:
  // devServer: {
  //   port: 8080,
  //   proxy: 'http://localhost:3000',
  // },
});
