import sequelize from '../config/database'; // Use default import

// Mock User model methods
jest.mock('../models/user', () => ({
  findOne: jest.fn(), // Mock findOne method
  create: jest.fn(),  // Mock create method
  findByPk: jest.fn(), // Mock findByPk method
  update: jest.fn(), // Mock update method
  destroy: jest.fn(), // Mock destroy method
}));

// Mock Order model methods
jest.mock('../models/order', () => ({
  findByPk: jest.fn(), // Mock findByPk method
  create: jest.fn(), // Mock create method
  findAll: jest.fn(), // Mock findAll method
  destroy: jest.fn(), // Mock destroy method
}));

// Mock JWT methods
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(), // Mock verify method
  sign: jest.fn(() => 'mockedToken'), // Mock sign method (returns a constant mock token)
}));

// Mock Sequelize connection
jest.mock('../config/database', () => ({
  sequelize: {
    authenticate: jest.fn().mockResolvedValue(undefined), // Mock a successful DB connection
    close: jest.fn().mockResolvedValue(undefined), // Mock closing the DB connection
  },
}));

/**
 * Global setup for environment variables or mock configurations.
 */
beforeAll(() => {
  // Set up mock environment variables
  process.env.JWT_SECRET = 'mock-secret-key'; // Mock JWT secret key
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
  await sequelize.close(); // Close the mocked DB connection
});
