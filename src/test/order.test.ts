import request from 'supertest';
import { app } from '../index'; // Import the app correctly
import sequelize from '../config/database'; // Correct import for Sequelize instance
import { User } from '../models/user'; // Correct named import
import { Service } from '../models/services'; // Correct named import for services model
import Order from '../models/order'; // Correct default import for Order model

// Correct mock for services model
jest.mock('../models/services', () => ({
  Service: {
    findByPk: jest.fn(),
  },
}));

// Mock for other models
jest.mock('../models/user', () => ({
  User: {
    findByPk: jest.fn(),
  },
}));

jest.mock('../models/order', () => ({
  Order: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn(),
  },
}));

describe('Order Controller Tests', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
    const mockService = { id: 1, name: 'Test Service' };

    // Mock the response for finding the user and service
    (User.findByPk as jest.Mock).mockResolvedValueOnce(mockUser);
    (Service.findByPk as jest.Mock).mockResolvedValueOnce(mockService);

    // Mock the Order create method to return a mock order
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
  });

  // Continue with other tests...
});
