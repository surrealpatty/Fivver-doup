module.exports = {
  moduleNameMapper: {
    '^../models/(.*)$': '<rootDir>/dist/models/$1',  // Ensure mapping for models
    '^src/(.*)$': '<rootDir>/dist/src/$1',           // Mapping for src folder
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
