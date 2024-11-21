import request from 'supertest';
import { app } from '../index'; // Ensure this points to the correct entry point for your app
import sequelize from '../config/database'; // Correct import for Sequelize instance
import User from '../models/user'; // Correct path for User model
import Service from '../models/services'; // Correct path for Service model
import Order from '../models/order'; // Correct path for Order model

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
    await sequelize.sync({ force: true }); // Reset database tables before tests
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset mock implementations after each test
  });

  afterAll(async () => {
    await sequelize.close(); // Close database connection after tests
  });

  // Test Create Order
  it('should create a new order', async () => {
    const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
    const mockService = { id: 1, name: 'Test Service' };

    // Mock User and Service `findByPk` methods
    (User.findByPk as jest.Mock).mockResolvedValueOnce(mockUser);
    (Service.findByPk as jest.Mock).mockResolvedValueOnce(mockService);

    // Mock Order creation
    (Order.create as jest.Mock).mockResolvedValueOnce({
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

    // Mock finding the order by ID
    (Order.findByPk as jest.Mock).mockResolvedValueOnce(mockOrderInstance);

    const response = await request(app)
      .put('/api/orders/1')
      .send({
        orderDetails: 'Updated details',
        status: 'Completed',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Order updated successfully');
    expect(response.body.order.status).toBe('Completed');
    expect(mockOrderInstance.save).toHaveBeenCalled(); // Ensure save method is called
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

    // Mock finding the order by ID
    (Order.findByPk as jest.Mock).mockResolvedValueOnce(mockOrderInstance);

    const response = await request(app).delete('/api/orders/1');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Order deleted successfully');
    expect(mockOrderInstance.destroy).toHaveBeenCalled(); // Ensure destroy method is called
  });

  // Test Get Order by ID (Order Not Found)
  it('should return 404 if the order is not found', async () => {
    // Mock finding a non-existing order
    (Order.findByPk as jest.Mock).mockResolvedValueOnce(null);

    const response = await request(app).get('/api/orders/9999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Order not found');
  });

  // Test Fetch All Orders
  it('should fetch all orders', async () => {
    const mockOrders = [
      { id: 1, orderDetails: 'Test order 1', status: 'Pending' },
      { id: 2, orderDetails: 'Test order 2', status: 'Completed' },
    ];

    // Mock Order `findAll` method
    (Order.findAll as jest.Mock).mockResolvedValueOnce(mockOrders);

    const response = await request(app).get('/api/orders');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].orderDetails).toBe('Test order 1');
  });
});
