import request from 'supertest';
import { app } from '../index'; // Ensure the correct path to your app entry point
import { Service } from '../models/services'; // Ensure the correct path to Service model
import { sequelize } from '../config/database'; // Ensure sequelize instance is correctly imported

jest.mock('../models/services', () => ({
  Service: {
    create: jest.fn(),
    findOne: jest.fn(),
  },
}));

// Ensure database sync before tests
beforeAll(async () => {
  try {
    await sequelize.sync({ force: true }); // Sync the database for testing
  } catch (error) {
    console.error('Database sync failed:', error); // Log errors for debugging
    throw error; // Rethrow to ensure test suite halts on critical setup failures
  }
});

// Close database connection after tests
afterAll(async () => {
  await sequelize.close();
});

describe('Service Tests', () => {
  it('should create a service successfully', async () => {
    // Mock resolved value for Service.create
    (Service.create as jest.Mock).mockResolvedValueOnce({
      id: '1',
      title: 'Test Service',
      description: 'This is a test service',
      price: 100,
      userId: 'test-user-id', // Add userId for a complete mock
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app).post('/api/services/create').send({
      title: 'Test Service',
      description: 'This is a test service',
      price: 100,
    });

    expect(response.status).toBe(201); // Check for successful response
    expect(response.body).toHaveProperty('id'); // Check response contains id
    expect(response.body.title).toBe('Test Service'); // Verify title
    expect(Service.create).toHaveBeenCalledWith({
      title: 'Test Service',
      description: 'This is a test service',
      price: 100,
    }); // Verify mock function was called with correct arguments
  });
});
