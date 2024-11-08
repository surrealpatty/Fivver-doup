module.exports = {
  moduleNameMapper: {
    '^../models/(.*)$': '<rootDir>/dist/models/$1',   // Maps imports from models directory
    '^src/(.*)$': '<rootDir>/dist/src/$1',            // Maps absolute imports from src directory
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.js',
  ],
};
