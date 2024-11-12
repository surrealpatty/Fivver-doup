// For DOM-related assertions, extend jest matchers for DOM elements (e.g., toBeInTheDocument, toHaveTextContent, etc.)
require('@testing-library/jest-dom');

// Mocking global objects if needed
// Example: Mocking fetch if you're using it in your tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'mocked data' }),
  })
);

// Optional: Mocking sessionStorage or localStorage if you're using them in your app
// global.sessionStorage = require('mock-local-storage');

// Mocking Sequelize (if you're testing without an actual database connection)
jest.mock('sequelize', () => {
  const SequelizeMock = jest.fn().mockImplementation(() => ({
    sync: jest.fn().mockResolvedValue(true),
    authenticate: jest.fn().mockResolvedValue(true),
    close: jest.fn().mockResolvedValue(true),
    // Mock methods for models, if necessary (e.g., findOne, create)
    define: jest.fn().mockReturnThis(),
  }));

  return {
    Sequelize: SequelizeMock,
  };
});

// Optional: Custom setup for initializing test database before tests run
global.beforeAll(async () => {
  console.log('Running global setup before all tests');
  // If using a real database or a mock DB, this is where you'd set that up
  // Example: await setupTestDatabase();
});

// Clean up after all tests (e.g., closing database connections or clearing mocks)
global.afterAll(async () => {
  console.log('Cleaning up after all tests');
  // Example: If using a real database, close connections or run teardown logic
  // await teardownTestDatabase();
});

// Reset mocks before each test to ensure no data is carried over
beforeEach(() => {
  jest.clearAllMocks(); // Clears any mock data before each test
});

// Optionally, you can add custom jest matchers if needed
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
