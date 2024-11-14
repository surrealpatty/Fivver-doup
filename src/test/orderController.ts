import request from 'supertest';
import app from '../app'; // Assuming app is your express app
import { sequelize } from '../config/database'; // Make sure you import sequelize correctly
import { User, Service, Order } from '../models'; // Your models

jest.mock('../models/user'); // Mock User model
jest.mock('../models/service'); // Mock Service model
jest.mock('../models/order'); // Mock Order model

describe('Order Controller Tests', () => {
  beforeAll(async () => {
    // Sync database for testing, or you can use an in-memory database for tests
    await sequelize.sync();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  afterAll(async () => {
    await sequelize.close();
  });

  // Test Create Order
  it('should create a new order', async () => {
    const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
    const mockService = { id: 1, name: 'Test Service' };

    // Mock the Sequelize findByPk method to return mock objects
    User.findByPk = jest.fn().mockResolvedValue(mockUser);
    Service.findByPk = jest.fn().mockResolvedValue(mockService);

    // Mock the Order creation
    Order.create = jest.fn().mockResolvedValue({
      userId: mockUser.id,
      serviceId: mockService.id,
      orderDetails: 'Test order details',
      status: 'Pending',
    });

    const response = await request(app).post('/orders').send({
      userId: 1,
      serviceId: 1,
      orderDetails: 'Test order details',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Order created successfully');
    expect(response.body.order.status).toBe('Pending');
  });

  // Test Get All Orders
  it('should fetch all orders', async () => {
    const mockOrders = [
      {
        userId: 1,
        serviceId: 1,
        orderDetails: 'Test order 1',
        status: 'Pending',
      },
      {
        userId: 2,
        serviceId: 2,
        orderDetails: 'Test order 2',
        status: 'Completed',
      },
    ];

    Order.findAll = jest.fn().mockResolvedValue(mockOrders);

    const response = await request(app).get('/orders');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].status).toBe('Pending');
  });

  // Test Get Order by ID
  it('should fetch a specific order by ID', async () => {
    const mockOrder = {
      userId: 1,
      serviceId: 1,
      orderDetails: 'Test order details',
      status: 'Pending',
    };

    Order.findByPk = jest.fn().mockResolvedValue(mockOrder);

    const response = await request(app).get('/orders/1');

    expect(response.status).toBe(200);
    expect(response.body.orderDetails).toBe('Test order details');
  });

  // Test Update Order
  it('should update an order', async () => {
    const mockOrder = {
      id: 1,
      userId: 1,
      serviceId: 1,
      orderDetails: 'Old details',
      status: 'Pending',
    };

    Order.findByPk = jest.fn().mockResolvedValue(mockOrder);
    Order.prototype.save = jest.fn().mockResolvedValue({
      ...mockOrder,
      orderDetails: 'Updated details',
      status: 'Completed',
    });

    const response = await request(app)
      .put('/orders/1')
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
    const mockOrder = {
      id: 1,
      userId: 1,
      serviceId: 1,
      orderDetails: 'Test order details',
      status: 'Pending',
    };

    Order.findByPk = jest.fn().mockResolvedValue(mockOrder);
    Order.prototype.destroy = jest.fn().mockResolvedValue(undefined);

    const response = await request(app).delete('/orders/1');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Order deleted successfully');
  });
});
