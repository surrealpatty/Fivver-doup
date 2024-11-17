module.exports = {
  preset: 'ts-jest',  // Using ts-jest preset for TypeScript support
  testEnvironment: 'node',  // Set the test environment to Node.js
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Transform TypeScript files
    '^.+\\.js$': 'babel-jest',  // Transform JavaScript files using Babel (if needed)
  },
  moduleNameMapper: {
    '^@models/(.*)$': '<rootDir>/src/models/$1',  // Map @models to src/models
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',  // Map @controllers to src/controllers
    '^@services/(.*)$': '<rootDir>/src/services/$1',  // Map @services to src/services
    '^@utils/(.*)$': '<rootDir>/src/utils/$1'  // Add utils if you're using them
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',  // Use the TypeScript config for Jest
    },
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'],  // Recognize JS, TS, and TSX files
};
