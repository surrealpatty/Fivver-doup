// jest.setup.js

// For DOM-related assertions, this extends jest matchers for DOM elements (e.g., toBeInTheDocument, toHaveTextContent, etc.)
require('@testing-library/jest-dom'); 

// Mocking global objects if needed
// Example: Mocking fetch if you're using it in your tests
// global.fetch = require('jest-fetch-mock');

// Example: Mocking sessionStorage or localStorage if you're using it in your app
// global.sessionStorage = require('mock-local-storage');

// Optional: Add custom mock for Sequelize or database connections if used in your application

// Example: Mocking Sequelize (if you're testing without an actual database connection)
jest.mock('sequelize', () => {
  const SequelizeMock = jest.fn().mockImplementation(() => ({
    sync: jest.fn().mockResolvedValue(true),
    authenticate: jest.fn().mockResolvedValue(true),
    close: jest.fn().mockResolvedValue(true),
  }));

  return {
    Sequelize: SequelizeMock,
  };
});

// Optional: Custom setup for initializing test database before tests run
global.beforeAll(async () => {
  // Perform setup actions (e.g., initialize a test database, or set mock data)
  console.log('Running global setup before all tests');
  // If using a real database or a mock DB, this is where you'd set that up
  // await setupTestDatabase();
});

// Clean up after all tests (e.g., closing database connections or clearing mocks)
global.afterAll(async () => {
  console.log('Cleaning up after all tests');
  // If using a real database, close connections or run teardown logic
  // await teardownTestDatabase();
});

// Optionally, you can add global mocks for more APIs or services if necessary
// For example, mocking an API call:
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'mocked data' }),
  })
);

// Reset mocks before each test to ensure no data is carried over
beforeEach(() => {
  jest.clearAllMocks();  // Clears any mock data before each test
});

// Optionally, add custom jest matchers if needed:
expect.extend({
  toBeEmpty: (received) => {
    if (received && received.length === 0) {
      return {
        message: () => `expected ${received} to be empty`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${received} to be empty`,
      pass: false,
    };
  },
});
