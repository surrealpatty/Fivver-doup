module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',  // Transforms TS and JS files using babel-jest
    '^.+\\.vue$': 'vue-jest',  // Ensures .vue files are transformed by vue-jest
  },
  testEnvironment: 'node', // Node environment for backend tests
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue'],  // Include 'vue' for handling Vue components
  transformIgnorePatterns: ['/node_modules/(?!(your-vue-module|other-module-to-transform)/)'],  // Ensure any necessary modules are transformed
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/dist/$1',  // Maps source to dist if needed
  },
  roots: ['<rootDir>/src'],  // Test files root location
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  // Optional: Add setup file for global configurations
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx,vue}'],  // Collect coverage from all relevant files
};
