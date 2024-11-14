import { User } from '../models/user'; // Importing User model to mock
import jwt from 'jsonwebtoken';
import { sequelize } from '../config/database'; // Importing sequelize to mock the database connection

// Mock global setup
jest.mock('../models/user', () => {
  return {
    // Mocking the necessary methods on the User model
    findOne: jest.fn(),
    create: jest.fn(),
  };
});

// Mocking JWT verify and sign methods
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
  sign: jest.fn(), // Mocking `sign` if it's used in your tests
}));

// Mocking sequelize database connection
jest.mock('../config/database', () => ({
  sequelize: {
    authenticate: jest.fn().mockResolvedValue(undefined), // Mock successful DB connection
  },
}));

// Optionally, mock other utilities or modules
// Example: Mock a utility function if needed
// jest.mock('../utils/someUtility', () => ({
//   someFunction: jest.fn().mockReturnValue('mocked value'),
// }));

// Global setup for environment variables or mock configurations
beforeAll(() => {
  // Set up mock environment variables (e.g., JWT secret key for signing and verification)
  process.env.JWT_SECRET = 'mock-secret-key';

  // Optional: You can add more environment variables or other global setup here if needed
});

// Reset mocks to ensure no state leaks between tests
afterEach(() => {
  jest.resetAllMocks(); // Clears all mock calls, resets mock states, and ensures clean tests
});

// Optionally, you can define global tear-down tasks after all tests have run
afterAll(() => {
  // Perform any clean-up operations here if necessary (e.g., closing DB connections)
  // Example: Close DB connection or remove global mock implementations if required
  sequelize.authenticate.mockRestore(); // Restore the original implementation if necessary
});
