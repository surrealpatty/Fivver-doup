module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for TypeScript files
    '^.+\\.js$': 'babel-jest', // Use babel-jest for JavaScript files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!your-esm-package-to-transform)/', // Ignore node_modules unless needed
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json', // Reference tsconfig file in the root directory
    },
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // For path aliases (e.g., @models/* => src/models/*)
  },
};
