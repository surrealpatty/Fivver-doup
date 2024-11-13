module.exports = {
    moduleFileExtensions: ['js', 'ts', 'json', 'vue', 'node'],
    transform: {
      '^.+\\.vue$': '@vue/vue3-jest', // Use @vue/vue3-jest for Vue 3 files
      '^.+\\.ts$': 'ts-jest', // Use ts-jest for TypeScript files
      '^.+\\.jsx?$': 'babel-jest', // Use babel-jest for JavaScript files
    },
    testEnvironment: 'jest-environment-jsdom', // Set jsdom as the test environment
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Ensure setup file is run after environment is set up
  };
  