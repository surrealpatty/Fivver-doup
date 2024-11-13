// Import jest-dom for DOM-related assertions
require('@testing-library/jest-dom');

// Mocking global objects if needed
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'mocked data' }),
  })
);

// Optional: Mocking sessionStorage or localStorage if you're using them in your app
global.sessionStorage = require('mock-local-storage');

// Mocking Sequelize (if you're testing without an actual database connection)
jest.mock('sequelize', () => {
  const SequelizeMock = jest.fn().mockImplementation(() => ({
    sync: jest.fn().mockResolvedValue(true),
    authenticate: jest.fn().mockResolvedValue(true),
    close: jest.fn().mockResolvedValue(true),
    define: jest.fn().mockReturnThis(),
    // Mocking common model methods
    model: {
      findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Test' }),  // Mocked data
      create: jest.fn().mockResolvedValue({ id: 1, name: 'Test' }),  // Mocked data
    },
  }));

  return {
    Sequelize: SequelizeMock,
  };
});

// Optionally, set a global setup for database or other initializations
global.beforeAll(async () => {
  console.log('Running global setup before all tests');
  // Setup test database or other resources if necessary
});

// Clean up mocks and any global state after all tests
global.afterAll(() => {
  console.log('Cleaning up after all tests');
  jest.clearAllMocks();  // Clear mocks after all tests
});

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();  // Clears any mock data before each test
});

// Custom matcher to check if array is empty
expect.extend({
  toBeEmpty: (received) => {
    const pass = received && received.length === 0;
    return {
      message: () => `expected ${received} to be empty`,
      pass,
    };
  },
});
