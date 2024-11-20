import request from 'supertest';
import app from '../index'; // Default export for app
import { sequelize } from '../config/database'; // Correctly imports Sequelize instance
import User from '../models/user'; // Adjust based on your models directory structure
import Service from '../models/services';
import Order from '../models/order';

// Mock the models
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
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Ensure database tables are reset before tests
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mock implementations
  });

  afterAll(async () => {
    await sequelize.close(); // Close Sequelize connection
  });

  // Test Create Order
  it('should create a new order', async () => {
    const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
    const mockService = { id: 1, name: 'Test Service' };

    // Mock User and Service `findByPk` methods
    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);
    (Service.findByPk as jest.Mock).mockResolvedValue(mockService);

    // Mock Order creation
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
        userId: mockUser.id,
        serviceId: mockService.id,
        orderDetails: 'Test order details',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Order created successfully');
    expect(response.body.order.status).toBe('Pending');
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
  });

  // Test Delete Order
  it('should delete an order', async () => {
    const mockOrderInstance = {
      id: 1,
      userId: 1,
      serviceId: 1,
      orderDetails: 'Test order details',
      status: 'Pending',
      destroy: jest.fn().mockResolvedValue(undefined),
    };

    (Order.findByPk as jest.Mock).mockResolvedValue(mockOrderInstance);

    const response = await request(app).delete('/api/orders/1');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Order deleted successfully');
  });

  // Test Get Order by ID (Order Not Found)
  it('should return 404 if the order is not found', async () => {
    (Order.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get('/api/orders/9999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Order not found');
  });
});
