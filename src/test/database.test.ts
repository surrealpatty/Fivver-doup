import 'reflect-metadata';  // Ensure this is the first import in the test file
import { Sequelize } from 'sequelize-typescript';  // Correct import for Sequelize
import { sequelize } from '../config/database';  // Correct import for sequelize instance
import { app } from '../index';  // Correct import for the app
import request from 'supertest';
import jwt from 'jsonwebtoken';  // Import jsonwebtoken for JWT verification
import { User } from '../models/user';  // Import User model to ensure it's added to Sequelize
import { Service } from '../models/services'; // Correct named import
import dotenv from 'dotenv';  // Import dotenv to load environment variables

// Load environment variables from .env file
dotenv.config();

// Ensure the models are added and synced before running the tests
beforeAll(async () => {
  // Initialize Sequelize with models explicitly
  const sequelizeInstance = new Sequelize({
    dialect: 'mysql',
    host: process.env.TEST_DB_HOST,  // Use environment variables for DB configuration
    username: process.env.TEST_DB_USERNAME as string,
    password: process.env.TEST_DB_PASSWORD as string,
    database: process.env.TEST_DB_NAME as string,
    models: [User, Service],  // Add models to Sequelize instance
  });

  // Add models to Sequelize instance and define associations
  sequelizeInstance.addModels([User, Service]);

  // Define the associations after models are loaded
  Service.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(Service, { foreignKey: 'userId' });  // Define the reverse association (optional)

  // Sync the database (use force: true only if you want to reset the DB, set force: false to preserve data)
  await sequelizeInstance.sync({ force: true });  // Reset DB to ensure a clean state
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
    console.log('User registration response:', userResponse.body);

    // Example request to authenticate and get a token
    const response = await request(app)  // Use supertest to make a request to the app
      .post('/login')  // Adjust the route based on your actual login route
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    // Ensure the response includes a valid token
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    console.log('Login response with token:', response.body);

    // Decode the token to verify its contents (if JWT is used)
    try {
      const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET || 'your-secret-key');
      expect(decoded).toHaveProperty('id');
      expect(decoded).toHaveProperty('email');
    } catch (err) {
      console.error('Error decoding JWT:', err);
      throw new Error('Invalid token or JWT decoding error');
    }
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

// Clean up after tests
afterAll(async () => {
  await sequelize.close();  // Close the Sequelize connection after tests
});
