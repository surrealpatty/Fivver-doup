module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for TypeScript files
    '^.+\\.js$': 'babel-jest', // Use babel-jest for JavaScript files
  },
  transformIgnorePatterns: [
    "/node_modules/(?!your-esm-package-to-transform)/", // Ignore node_modules unless needed
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Reference your tsconfig
    },
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'],
};
