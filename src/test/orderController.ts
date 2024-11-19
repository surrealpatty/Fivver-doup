import request from 'supertest';
import { app } from '../index'; // Adjust the import to match your app's entry point
import { sequelize } from '../config/database'; // Make sure sequelize instance is correctly imported
export { default as Order } from './order';
export { default as User } from './user';
export { Service } from './services';


// Mocking models
jest.mock('../models/user');
jest.mock('../models/service');
jest.mock('../models/order');

describe('Order Controller', () => {
  beforeAll(async () => {
    // Setup database before tests (optional depending on your test environment)
    await sequelize.sync({ force: true }); // Create tables and reset data
  });

  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
  });

  afterAll(async () => {
    // Clean up after tests
    await sequelize.close();
  });

  // Test createOrder
  describe('POST /orders', () => {
    it('should create a new order successfully', async () => {
      // Mock User and Service findByPk
      (User.findByPk as jest.Mock).mockResolvedValue({ id: 1, name: 'Test User' });
      (Service.findByPk as jest.Mock).mockResolvedValue({ id: 1, name: 'Test Service' });

      const response = await request(app)
        .post('/orders')
        .send({
          userId: 1,
          serviceId: 1,
          orderDetails: 'Test order details',
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Order created successfully');
      expect(response.body.order).toHaveProperty('userId', 1);
      expect(response.body.order).toHaveProperty('serviceId', 1);
    });

    it('should return 404 if user or service not found', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);
      (Service.findByPk as jest.Mock).mockResolvedValue({ id: 1, name: 'Test Service' });

      const response = await request(app)
        .post('/orders')
        .send({
          userId: 1,
          serviceId: 1,
          orderDetails: 'Test order details',
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User or Service not found');
    });
  });

  // Test getAllOrders
  describe('GET /orders', () => {
    it('should fetch all orders', async () => {
      // Mock Order findAll
      (Order.findAll as jest.Mock).mockResolvedValue([{ id: 1, orderDetails: 'Order 1' }]);

      const response = await request(app).get('/orders');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty('orderDetails', 'Order 1');
    });
  });

  // Test getOrderById
  describe('GET /orders/:id', () => {
    it('should fetch order by ID', async () => {
      // Mock Order findByPk
      (Order.findByPk as jest.Mock).mockResolvedValue({ id: 1, orderDetails: 'Order 1' });

      const response = await request(app).get('/orders/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('orderDetails', 'Order 1');
    });

    it('should return 404 if order not found', async () => {
      // Mock Order findByPk to return null
      (Order.findByPk as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/orders/999');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Order not found');
    });
  });

  // Test updateOrder
  describe('PUT /orders/:id', () => {
    it('should update the order', async () => {
      // Mock Order findByPk and save
      const mockOrder = { id: 1, orderDetails: 'Old details', status: 'Pending', save: jest.fn() };
      (Order.findByPk as jest.Mock).mockResolvedValue(mockOrder);

      const response = await request(app)
        .put('/orders/1')
        .send({
          orderDetails: 'Updated details',
          status: 'Completed',
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Order updated successfully');
      expect(response.body.order).toHaveProperty('orderDetails', 'Updated details');
      expect(mockOrder.save).toHaveBeenCalled();
    });

    it('should return 404 if order not found', async () => {
      // Mock Order findByPk to return null
      (Order.findByPk as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .put('/orders/999')
        .send({
          orderDetails: 'Updated details',
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Order not found');
    });
  });

  // Test deleteOrder
  describe('DELETE /orders/:id', () => {
    it('should delete the order', async () => {
      // Mock Order findByPk and destroy
      const mockOrder = { id: 1, destroy: jest.fn() };
      (Order.findByPk as jest.Mock).mockResolvedValue(mockOrder);

      const response = await request(app).delete('/orders/1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Order deleted successfully');
      expect(mockOrder.destroy).toHaveBeenCalled();
    });

    it('should return 404 if order not found', async () => {
      // Mock Order findByPk to return null
      (Order.findByPk as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete('/orders/999');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Order not found');
    });
  });
});
