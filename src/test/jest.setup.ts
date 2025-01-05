// src/test/jest.setup.ts
import { jest } from '@jest/globals';
import { sequelize } from '../config/database';  // Correct import of sequelize

// Mock jsonwebtoken globally
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn().mockReturnValue({ id: 'test-id', email: 'test@example.com' }),  // Mock the response of the verify function
}));

// Cleanup after tests
afterAll(async () => {
    // Close the database connection after all tests have completed
    await sequelize.close();
    console.log('Database connection closed');
});
