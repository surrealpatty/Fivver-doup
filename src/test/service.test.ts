import 'reflect-metadata'; // Ensure this is the first import
import request from 'supertest';
import { app } from '../index';  // Adjusting to the source directory directly
import dotenv from 'dotenv';  // Import dotenv to load environment variables
import { Sequelize } from 'sequelize-typescript';  // Correct import of Sequelize
import { Service } from '../models/services';  // Correct import path for Service model

// Mocking the Service model methods
jest.mock('../models/services', () => ({
  Service: {
    create: jest.fn(),
    findOne: jest.fn(),
  },
}));

// Load environment variables from .env file
dotenv.config();

// Sequelize initialization for test database
const sequelize = new Sequelize({
  username: process.env.TEST_DB_USERNAME as string,  // Use test DB credentials
  password: process.env.TEST_DB_PASSWORD as string,
  database: process.env.TEST_DB_NAME as string,
  host: process.env.TEST_DB_HOST as string,  // Ensure correct host for the test DB
  dialect: 'mysql',
  models: [Service],  // Add models to Sequelize initialization for tests
});

// Sync database before tests
beforeAll(async () => {
  await sequelize.sync({ force: true });  // This will drop and recreate tables for each test
});

// Retry logic for all tests in this suite
beforeEach(() => {
  jest.retryTimes(3);  // Retries failed tests 3 times before reporting an error
});

describe('Service Tests', () => {
  describe('POST /api/services/create', () => {
    it('should create a service successfully', async () => {
      // Mock resolved value for Service.create
      (Service.create as jest.Mock).mockResolvedValueOnce({
        id: '1',
        title: 'Test Service',
        description: 'This is a test service',
        price: 100,
      });

      // Send a POST request to create service endpoint
      const response = await request(app).post('/api/services/create').send({
        title: 'Test Service',
        description: 'This is a test service',
        price: 100,
      });

      // Verify the response
      expect(response.status).toBe(201); // Expecting a 201 Created status
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test Service');
      // Verify that Service.create was called with the correct parameters
      expect(Service.create).toHaveBeenCalledWith({
        title: 'Test Service',
        description: 'This is a test service',
        price: 100,
      });
    });

    it('should return an error if service creation fails', async () => {
      // Mock rejected value for Service.create
      (Service.create as jest.Mock).mockRejectedValueOnce(new Error('Service creation failed'));

      const response = await request(app).post('/api/services/create').send({
        title: 'Test Service',
        description: 'This is a test service',
        price: 100,
      });

      expect(response.status).toBe(400); // Correcting the expected status
      expect(response.body).toHaveProperty('error', 'Service creation failed');
    });
  });
});
