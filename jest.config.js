// jest.config.js
module.exports = {
    transform: {
      '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Use babel-jest for both TS and JS files
    },
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // Ensure it recognizes TypeScript and JavaScript files
    transformIgnorePatterns: ['/node_modules/'], // Ensures node_modules are not transformed
  };
  