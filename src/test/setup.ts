import { User } from '../models/user';  // Adjust the import path if necessary
import jwt from 'jsonwebtoken';

// Mock global setup
jest.mock('../models/user');  // Mock the User model for the tests

// Mocking JWT verify method
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

// Mock other necessary modules
// Example: Mock database connection
jest.mock('../config/database', () => ({
  sequelize: {
    authenticate: jest.fn().mockResolvedValue(undefined),
  },
}));
