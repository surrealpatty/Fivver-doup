// src/test/app.test.ts

import 'reflect-metadata';  // Ensure this is the first import in the test file
import { Sequelize } from 'sequelize-typescript';  // Correct import for Sequelize
import { app } from '../index';  // Adjust the import for your app
import request from 'supertest';
import jwt from 'jsonwebtoken';  // Import jsonwebtoken for JWT verification
import { sequelize } from '../config/database';  // Correct import for the sequelize instance
import User from '../models/user';  // Import User model to ensure it's added to Sequelize
import Service from '../models/services';  // Import Service model to ensure it's added to Sequelize
import dotenv from 'dotenv';  // Import dotenv to load environment variables

// Load environment variables from .env file
dotenv.config();

// Sequelize setup for test environment
let sequelizeInstance: Sequelize;

beforeAll(async () => {
  // Initialize Sequelize with models explicitly
  sequelizeInstance = new Sequelize({
    dialect: 'mysql',
    host: process.env.TEST_DB_HOST,  // Use environment variables for DB configuration
    username: process.env.TEST_DB_USERNAME as string,
    password: process.env.TEST_DB_PASSWORD as string,
    database: process.env.TEST_DB_NAME as string,
    models: [User, Service],  // Add models to Sequelize instance
  });

  // Define associations between models
  Service.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(Service, { foreignKey: 'userId' });

  // Sync the database (force: true to reset DB for each test)
  await sequelizeInstance.sync({ force: true });
});

describe('Authentication Tests', () => {
  it('should authenticate and return a valid JWT token', async () => {
    // First, create a test user (for the purpose of the test)
    const userResponse = await request(app)
      .post('/register')  // Assuming you have a route for user registration
      .send({
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
      });

    // Check if the user was successfully created
    expect(userResponse.status).toBe(201);

    // Now, authenticate and get a token
    const response = await request(app)  // Use supertest to make a request to the app
      .post('/login')  // Adjust the route based on your actual login route
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    // Ensure the response includes a valid token
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();

    // Decode the token to verify its contents (if JWT is used)
    const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET || 'your-secret-key');
    expect(decoded).toHaveProperty('id');
    expect(decoded).toHaveProperty('email');
  });

  it('should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/login')  // Replace with your actual login route
      .send({ email: 'invalid@example.com', password: 'wrongpassword' });

    // Assert the response status and message
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials.');
  });
});

describe('Service Tests', () => {
  it('should create a service successfully', async () => {
    // Mock resolved value for Service.create if necessary
    const mockServiceCreate = jest.spyOn(Service, 'create').mockResolvedValueOnce({
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
    expect(mockServiceCreate).toHaveBeenCalledWith({
      title: 'Test Service',
      description: 'This is a test service',
      price: 100,
    });

    // Clean up the mock after test
    mockServiceCreate.mockRestore();
  });

  it('should return an error if service creation fails', async () => {
    // Mock rejected value for Service.create if necessary
    const mockServiceCreate = jest.spyOn(Service, 'create').mockRejectedValueOnce(new Error('Service creation failed'));

    const response = await request(app).post('/api/services/create').send({
      title: 'Test Service',
      description: 'This is a test service',
      price: 100,
    });

    expect(response.status).toBe(400); // Correct the expected status code
    expect(response.body).toHaveProperty('error', 'Service creation failed');

    // Clean up the mock after test
    mockServiceCreate.mockRestore();
  });
});

// Clean up after tests
afterAll(async () => {
  // Gracefully close the Sequelize connection after all tests
  await sequelizeInstance.close();
});
