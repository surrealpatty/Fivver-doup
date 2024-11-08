module.exports = {
  moduleNameMapper: {
    '^middleware/(.*)$': '<rootDir>/dist/middleware/$1',
    '^models/(.*)$': '<rootDir>/dist/models/$1', // Ensure this maps correctly to dist/models
    '^src/(.*)$': '<rootDir>/dist/src/$1',
    '^controllers/(.*)$': '<rootDir>/dist/controllers/$1',
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
