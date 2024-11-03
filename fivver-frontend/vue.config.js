// Check if defineConfig is necessary or fallback to standard exports
let config = {
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

try {
  const { defineConfig } = require('@vue/cli-service');
  if (typeof defineConfig === 'function') {
    module.exports = defineConfig(config);
  } else {
    console.warn('defineConfig is not a function, using regular module export.');
    module.exports = config;
  }
} catch (error) {
  console.warn('Error loading @vue/cli-service, falling back to regular module export:', error.message);
  module.exports = config;
}
