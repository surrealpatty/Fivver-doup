import path from 'path';
import request from 'supertest';
import { Express } from 'express';
import { sequelize } from '../config/database';  // Corrected import for sequelizes
import  User  from '../models/user';
import Service from '../models/services';
import { Order } from '../models/order';
import  app  from '../../src/index';  // Import app from src/index directly

// Mock the methods of the models
jest.mock('../models/services', () => ({
  findByPk: jest.fn(),
}));

jest.mock('../models/user', () => ({
  findByPk: jest.fn(),
}));

// Mock the Order model methods
jest.mock('../models/order', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  destroy: jest.fn(),
}));

beforeAll(async () => {
  try {
    // Sync the database before running tests
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error('Error syncing database:', error);
    throw error; // Ensure the test fails if the database sync fails
  }
});

afterEach(() => {
  jest.clearAllMocks(); // Clear mocks to ensure clean state between tests
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection after all tests
});

describe('Order Controller Tests', () => {
  it('should create a new order', async () => {
    const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
    const mockService = { id: 1, name: 'Test Service' };

    // Mock the response for finding the user and service
    (User.findByPk as jest.Mock).mockResolvedValueOnce(mockUser);
    (Service.findByPk as jest.Mock).mockResolvedValueOnce(mockService);

    // Mock the Order.create method to return a mock order
    (Order.create as jest.Mock).mockResolvedValueOnce({
      id: 1,
      userId: mockUser.id,
      serviceId: mockService.id,
      orderDetails: 'Test order details',
      status: 'Pending',
    });

    // Make the API request to create the order
    const response = await request(app).post('/api/orders').send({
      userId: mockUser.id,
      serviceId: mockService.id,
      orderDetails: 'Test order details',
    });

    // Assert the expected outcome
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Order created successfully');
    expect(response.body.order.status).toBe('Pending');
    expect(Order.create).toHaveBeenCalledWith({
      userId: mockUser.id,
      serviceId: mockService.id,
      orderDetails: 'Test order details',
    });
  });

  it('should return an error if user is not found', async () => {
    const mockService = { id: 1, name: 'Test Service' };

    // Mock the response for finding the user and service
    (User.findByPk as jest.Mock).mockResolvedValueOnce(null); // No user found
    (Service.findByPk as jest.Mock).mockResolvedValueOnce(mockService);

    // Make the API request to create the order
    const response = await request(app).post('/api/orders').send({
      userId: 999, // Non-existing user
      serviceId: mockService.id,
      orderDetails: 'Test order details',
    });

    // Assert the expected outcome
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  it('should return an error if service is not found', async () => {
    const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };

    // Mock the response for finding the user and service
    (User.findByPk as jest.Mock).mockResolvedValueOnce(mockUser);
    (Service.findByPk as jest.Mock).mockResolvedValueOnce(null); // No service found

    // Make the API request to create the order
    const response = await request(app).post('/api/orders').send({
      userId: mockUser.id,
      serviceId: 999, // Non-existing service
      orderDetails: 'Test order details',
    });

    // Assert the expected outcome
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Service not found');
  });
});
