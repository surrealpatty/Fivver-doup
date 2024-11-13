// jest.setup.js

// Import jest-dom for DOM-related assertions
require('@testing-library/jest-dom');

// Mocking global objects if needed (for example, fetch)
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'mocked data' }),
  })
);

// Mock sessionStorage by using the `mock-local-storage` package
// This avoids redefining the sessionStorage property directly
const mockStorage = require('mock-local-storage');
global.sessionStorage = mockStorage;

// Mocking Sequelize (if you're testing without an actual database connection)
jest.mock('sequelize', () => {
  const SequelizeMock = jest.fn().mockImplementation(() => ({
    sync: jest.fn().mockResolvedValue(true),
    authenticate: jest.fn().mockResolvedValue(true),
    close: jest.fn().mockResolvedValue(true),
    define: jest.fn().mockReturnThis(),
    // Mock common model methods (findOne, create, etc.)
    model: {
      findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Test' }),  // Mocked data
      create: jest.fn().mockResolvedValue({ id: 1, name: 'Test' }),   // Mocked data
    },
  }));

  return {
    Sequelize: SequelizeMock,
  };
});

// Optionally, set up global tests (e.g., database setup/teardown)
global.beforeAll(async () => {
  console.log('Running global setup before all tests');
  // Setup test database or mock DB if necessary
});

// Clean up after all tests
global.afterAll(() => {
  console.log('Cleaning up after all tests');
  jest.clearAllMocks();  // Clear mocks after all tests
});

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();  // Clears any mock data before each test
});

// Custom matcher to check if an array is empty
expect.extend({
  toBeEmpty: (received) => {
    const pass = received && received.length === 0;
    return {
      message: () => `expected ${received} to be empty`,
      pass,
    };
  },
});
