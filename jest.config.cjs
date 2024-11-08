module.exports = {
  moduleNameMapper: {
    '^middleware/(.*)$': '<rootDir>/dist/src/middleware/$1',      // Middleware path mapping
    '^models/(.*)$': '<rootDir>/dist/models/$1',                  // Models path mapping
    '^controllers/(.*)$': '<rootDir>/dist/src/controllers/$1',    // Controllers path mapping
    '^src/(.*)$': '<rootDir>/dist/src/$1',                        // General src path mapping
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
