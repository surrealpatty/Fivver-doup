import request from 'supertest';
import { app } from '../index'; // Ensure this path is correct based on your project structure
import { sequelize } from '../config/database'; // Correct import for sequelize
import User from '../models/user'; // Correct import path for User model
import Service from '../models/services'; // Correct import path for Service model
import Order from '../models/order'; // Correct import path for Order model

// Mock models using jest
jest.mock('../models/user', () => ({
  findByPk: jest.fn(),
}));
jest.mock('../models/services', () => ({
  findByPk: jest.fn(),
}));
jest.mock('../models/order', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  destroy: jest.fn(),
}));

describe('Order Controller Tests', () => {
  // Sync the database for testing (use an in-memory DB for tests if possible)
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Use force to drop and re-sync the DB for clean tests
  });

  // Clear mocks after each test to avoid state leakage
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks between tests to ensure isolation
  });

  // Close the database connection after all tests are completed
  afterAll(async () => {
    await sequelize.close(); // Close the database connection after all tests
  });

  // Test Create Order
  it('should create a new order', async () => {
    const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
    const mockService = { id: 1, name: 'Test Service' };

    // Mock the User and Service findByPk methods
    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);
    (Service.findByPk as jest.Mock).mockResolvedValue(mockService);

    // Mock the Order creation
    (Order.create as jest.Mock).mockResolvedValue({
      id: 1,
      userId: mockUser.id,
      serviceId: mockService.id,
      orderDetails: 'Test order details',
      status: 'Pending',
    });

    const response = await request(app)
      .post('/api/orders')
      .send({
        userId: 1,
        serviceId: 1,
        orderDetails: 'Test order details',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Order created successfully');
    expect(response.body.order.status).toBe('Pending');
    expect(response.body.order.userId).toBe(1); // Check user ID in response
  });

  // Test Update Order
  it('should update an order', async () => {
    const mockOrderInstance = {
      id: 1,
      userId: 1,
      serviceId: 1,
      orderDetails: 'Old details',
      status: 'Pending',
      save: jest.fn().mockResolvedValue({
        id: 1,
        userId: 1,
        serviceId: 1,
        orderDetails: 'Updated details',
        status: 'Completed',
      }),
    };

    // Mock the findByPk method to return the mockOrderInstance
    (Order.findByPk as jest.Mock).mockResolvedValue(mockOrderInstance);

    const response = await request(app)
      .put('/api/orders/1')
      .send({
        orderDetails: 'Updated details',
        status: 'Completed',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Order updated successfully');
    expect(response.body.order.status).toBe('Completed');
    expect(response.body.order.orderDetails).toBe('Updated details');
  });

  // Test Delete Order
  it('should delete an order', async () => {
    const mockOrderInstance = {
      id: 1,
      userId: 1,
      serviceId: 1,
      orderDetails: 'Test order details',
      status: 'Pending',
      destroy: jest.fn().mockResolvedValue(undefined), // Mock the destroy method
    };

    // Mock the findByPk method to return the mockOrderInstance
    (Order.findByPk as jest.Mock).mockResolvedValue(mockOrderInstance);

    const response = await request(app).delete('/api/orders/1');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Order deleted successfully');
  });

  // Test Get Order by ID (Order Not Found)
  it('should return 404 if the order is not found', async () => {
    // Mock Order.findByPk to return null (not found)
    (Order.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get('/api/orders/9999'); // Non-existent order

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Order not found');
  });
});
