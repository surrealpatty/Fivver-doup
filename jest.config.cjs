module.exports = {
  moduleNameMapper: {
    '^middleware/(.*)$': '<rootDir>/dist/middleware/$1',  // Correct the path to the dist/middleware
    '^models/(.*)$': '<rootDir>/dist/models/$1',
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
