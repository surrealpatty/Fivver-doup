module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Use ts-jest for TypeScript files
    '^.+\\.jsx?$': 'babel-jest',  // Use babel-jest for JS files
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Maps @ to src for Jest
  },
  roots: ['<rootDir>/src'],  // Ensure that Jest is looking for tests inside the src folder
  testEnvironment: 'node',  // Use Node environment for testing
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  // Setup files for Jest environment
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],  // Collect coverage for source files
  transformIgnorePatterns: ['/node_modules/'],  // Ignore transformation for node_modules
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',  // Reference your tsconfig.json
    },
    'babel-jest': {
      isolatedModules: true,  // Optimize performance with Babel
    },
  },
};
