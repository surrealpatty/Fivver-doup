// src/test/orderController.ts

import { sequelize } from '@config/database';  // Named import for sequelize

import Order from '../models/order';
import { User } from '../models/user'; 
import Service from '../models/services';
import request from 'supertest'; 
import { app } from '../index';  // Now importing correctly after app export

// Mock models with correct types
jest.mock('../models/user');
jest.mock('../models/services');
jest.mock('../models/order');

// Mocking methods for Sequelize models
const mockFindByPkUser = jest.fn();
const mockFindByPkService = jest.fn();
const mockFindByPkOrder = jest.fn();
const mockFindAllOrder = jest.fn();

// Assigning mock functions to models
(User.findByPk as jest.Mock) = mockFindByPkUser;
(Service.findByPk as jest.Mock) = mockFindByPkService;
(Order.findByPk as jest.Mock) = mockFindByPkOrder;
(Order.findAll as jest.Mock) = mockFindAllOrder;

describe('Order Controller', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /orders', () => {
    it('should create a new order successfully', async () => {
      // Mocking the User and Service data for successful creation
      mockFindByPkUser.mockResolvedValueOnce({ id: 1, name: 'Test User' });
      mockFindByPkService.mockResolvedValueOnce({ id: 1, name: 'Test Service' });

      // Sending request to create order
      const response = await request(app).post('/orders').send({
        userId: 1,
        serviceId: 1,
        orderDetails: 'Test order details',
      });

      // Asserting successful response
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Order created successfully');
      expect(response.body.order).toHaveProperty('userId', 1);
      expect(response.body.order).toHaveProperty('serviceId', 1);
    });

    it('should return 404 if user or service not found', async () => {
      // Mocking user not found
      mockFindByPkUser.mockResolvedValueOnce(null);
      mockFindByPkService.mockResolvedValueOnce({ id: 1, name: 'Test Service' });

      // Sending request to create order
      const response = await request(app).post('/orders').send({
        userId: 1,
        serviceId: 1,
        orderDetails: 'Test order details',
      });

      // Asserting response for not found user
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User or Service not found');
    });

    it('should return 404 if service not found', async () => {
      // Mocking service not found
      mockFindByPkUser.mockResolvedValueOnce({ id: 1, name: 'Test User' });
      mockFindByPkService.mockResolvedValueOnce(null);

      // Sending request to create order
      const response = await request(app).post('/orders').send({
        userId: 1,
        serviceId: 1,
        orderDetails: 'Test order details',
      });

      // Asserting response for not found service
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User or Service not found');
    });
  });
});
