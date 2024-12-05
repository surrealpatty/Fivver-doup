import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();  // Ensure the environment variables are loaded before any tests run

// Mocking modules and models for testing

// Mock User model methods
jest.mock('../models/user', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

// Mock Order model methods
jest.mock('../models/order', () => ({
  findByPk: jest.fn(),
  create: jest.fn(),
  findAll: jest.fn(),
  destroy: jest.fn(),
}));

// Mock JWT methods
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
  sign: jest.fn(() => 'mockedToken'), // Return a constant mocked token
}));

// Mock Sequelize connection
jest.mock('../config/database', () => ({
  sequelize: {
    authenticate: jest.fn().mockResolvedValue(undefined), // Mock DB authentication
    close: jest.fn().mockResolvedValue(undefined), // Mock DB connection close
  },
}));

/**
 * Global setup for environment variables or mock configurations.
 */
beforeAll(() => {
  // Set up mock environment variables
  process.env.JWT_SECRET = 'mock-secret-key'; // Mock JWT secret key for testing
  // Other environment variables can be set here if needed
  console.log('Setting up before all tests...');
});

/**
 * Reset mocks to ensure no state leaks between tests.
 */
afterEach(() => {
  jest.clearAllMocks(); // Clears all mock calls and resets mock states after each test
});

/**
 * Clean-up tasks after all tests have run.
 */
afterAll(async () => {
  console.log('Cleaning up after all tests...');
  await import('../config/database').then(async (module) => {
    await module.sequelize.close(); // Close the mocked DB connection
  });
});

// Ensure Jest global functions are available for all tests
import '@jest/globals'; // Import Jest globals to ensure they are available globally in tests

