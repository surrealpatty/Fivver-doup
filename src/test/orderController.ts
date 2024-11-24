import { sequelize } from '../config/database'; // Correct named import
import Order from '../models/order';
import  User  from '../models/user';
import  Service  from '../models/services';
import request from 'supertest'; // Assuming you're using supertest for API testing
import { app } from '../index';  // Now exporting 'app' from the index file

// Mock models with correct types
jest.mock('../models/user');
jest.mock('../models/services');
jest.mock('../models/order');

// Mocking methods for Sequelize models
const mockFindByPk = jest.fn();
const mockFindAll = jest.fn();

(User.findByPk as jest.Mock) = mockFindByPk;
(Service.findByPk as jest.Mock) = mockFindByPk;
(Order.findByPk as jest.Mock) = mockFindByPk;
(Order.findAll as jest.Mock) = mockFindAll;

describe('Order Controller', () => {
  beforeAll(async () => {
    // Setup database before tests (optional depending on your test environment)
    await sequelize.sync({ force: true }); // Create tables and reset data
  });

  beforeEach(() => {
    // Reset mocks before each test to ensure clean slate for tests
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
      mockFindByPk.mockResolvedValueOnce({ id: 1, name: 'Test User' }); // Mock User found
      mockFindByPk.mockResolvedValueOnce({ id: 1, name: 'Test Service' }); // Mock Service found

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
      mockFindByPk.mockResolvedValueOnce(null); // User not found
      mockFindByPk.mockResolvedValueOnce({ id: 1, name: 'Test Service' }); // Mock Service found

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

  // Other test cases as needed...
});
