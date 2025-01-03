import { Order } from '../models/order'; // Import the Order model
import { sequelize } from '../config/database'; // Correct import of sequelize
import { app } from '../index'; // Correct import of app
import request from 'supertest'; // Import supertest for API requests
import { User } from '../models/user'; // Import User model
import Service from '../models/services'; // Import Service model as default

// Mock the methods of the models
jest.mock('../models/services', () => ({
  findByPk: jest.fn(),
}));

jest.mock('../models/user', () => ({
  findByPk: jest.fn(),
}));

jest.mock('../models/order', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  destroy: jest.fn(),
}));

// Mock the sequelize instance to avoid interacting with a real database
jest.mock('../config/database', () => ({
  sequelize: {
    sync: jest.fn().mockResolvedValue(null),
    close: jest.fn().mockResolvedValue(null),
    authenticate: jest.fn().mockResolvedValue(null), // Mock authenticate
  },
}));

beforeAll(async () => {
  try {
    await sequelize.authenticate(); // Mock database connection
    console.log('Mock database connected successfully!');
    await sequelize.sync({ force: true }); // Ensure a clean state before tests
  } catch (error) {
    console.error('Error during database setup:', error);
    throw error; // Fail tests if database setup fails
  }
});

afterEach(() => {
  jest.clearAllMocks(); // Clear mocks to ensure a clean state
});

afterAll(async () => {
  await sequelize.close(); // Close the mock database connection
});

describe('Order Controller Tests', () => {
  it('should create a new order', async () => {
    const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
    const mockService = { id: 1, name: 'Test Service' };

    // Mock User and Service responses
    (User.findByPk as jest.Mock).mockResolvedValueOnce(mockUser);
    (Service.findByPk as jest.Mock).mockResolvedValueOnce(mockService);

    // Mock Order.create method
    (Order.create as jest.Mock).mockResolvedValueOnce({
      id: 1,
      userId: mockUser.id,
      serviceId: mockService.id,
      orderDetails: 'Test order details',
      status: 'Pending',
    });

    const response = await request(app).post('/api/orders').send({
      userId: mockUser.id,
      serviceId: mockService.id,
      orderDetails: 'Test order details',
    });

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

    (User.findByPk as jest.Mock).mockResolvedValueOnce(null); // Mock no user found
    (Service.findByPk as jest.Mock).mockResolvedValueOnce(mockService);

    const response = await request(app).post('/api/orders').send({
      userId: 999,
      serviceId: mockService.id,
      orderDetails: 'Test order details',
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  it('should return an error if service is not found', async () => {
    const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };

    (User.findByPk as jest.Mock).mockResolvedValueOnce(mockUser);
    (Service.findByPk as jest.Mock).mockResolvedValueOnce(null); // Mock no service found

    const response = await request(app).post('/api/orders').send({
      userId: mockUser.id,
      serviceId: 999,
      orderDetails: 'Test order details',
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Service not found');
  });

  it('should return an error if order details are missing', async () => {
    const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
    const mockService = { id: 1, name: 'Test Service' };

    (User.findByPk as jest.Mock).mockResolvedValueOnce(mockUser);
    (Service.findByPk as jest.Mock).mockResolvedValueOnce(mockService);

    const response = await request(app).post('/api/orders').send({
      userId: mockUser.id,
      serviceId: mockService.id,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Order details are required');
  });
});
