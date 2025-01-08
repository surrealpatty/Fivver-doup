import 'reflect-metadata';  // Ensure reflect-metadata is imported first for sequelize-typescript
import { Sequelize } from 'sequelize-typescript';  // Import Sequelize from sequelize-typescript
import request from 'supertest';  // For making HTTP requests to your app
import jwt from 'jsonwebtoken';  // For verifying JWT tokens
import dotenv from 'dotenv';  // To load environment variables
import { sequelize } from '../config/database';  // Correct import for sequelize instance
import { User } from '../models/user';  // Correct import for the User model
import { Service } from '../models/services';  // Correct import for the Service model

// Import the app as a named export
import app from '../index';  // Default import

dotenv.config();  // Load environment variables from .env file

let sequelizeInstance: Sequelize;  // Declare sequelizeInstance with correct typing

beforeAll(async () => {
  // Initialize Sequelize with models explicitly and correct types
  sequelizeInstance = new Sequelize({
    dialect: 'mysql',
    host: process.env.TEST_DB_HOST,
    username: process.env.TEST_DB_USERNAME as string,
    password: process.env.TEST_DB_PASSWORD as string,
    database: process.env.TEST_DB_NAME as string,
    models: [User, Service],  // Ensure the models are correctly passed
    logging: false,  // Disable logging in tests
  });

  // Add models and define associations after models are loaded
  sequelizeInstance.addModels([User, Service]);

  // Define associations explicitly (belongsTo and hasMany)
  Service.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(Service, { foreignKey: 'userId' });

  // Check the database connection and sync with the DB
  await sequelizeInstance.authenticate();  // Ensure connection is successful
  await sequelizeInstance.sync({ force: true });  // Sync the database (force: true resets the database)
});

describe('Authentication Tests', () => {
  it('should authenticate and return a valid JWT token', async () => {
    // First, create a test user (for registration)
    const userResponse = await request(app)
      .post('/register')  // Make sure the registration route is correct
      .send({
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
      });

    // Ensure the user was created successfully
    expect(userResponse.status).toBe(201);

    // Now, attempt to log in and get a token
    const loginResponse = await request(app)
      .post('/login')  // Adjust the login route based on your app's setup
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    // Ensure the login was successful and the token is returned
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.token).toBeDefined();  // Ensure a token is returned

    // Decode the token to verify its contents
    const decoded = jwt.verify(
      loginResponse.body.token,
      process.env.JWT_SECRET_KEY || 'your-secret-key'
    );
    expect(decoded).toHaveProperty('id');  // Ensure the decoded token contains 'id'
    expect(decoded).toHaveProperty('email');  // Ensure the decoded token contains 'email'
  });

  it('should reject invalid credentials', async () => {
    // Attempt to login with incorrect credentials
    const response = await request(app)
      .post('/login')  // Ensure this route matches your app's login endpoint
      .send({
        email: 'invalid@example.com',
        password: 'wrongpassword',
      });

    // Ensure the response is a 401 Unauthorized with the correct error message
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials.');  // Adjust message if necessary
  });

  // Authentication Middleware Tests
  it('should return 401 when no token is provided', async () => {
    const response = await request(app).get('/protected-route');  // Adjust this route if needed
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authorization token is missing or invalid');
  });

  it('should return 403 when an invalid token is provided', async () => {
    const response = await request(app)
      .get('/protected-route')  // Adjust this route if needed
      .set('Authorization', 'Bearer invalidtoken');
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Invalid or expired token');
  });

  it('should pass authentication when a valid token is provided', async () => {
    // First, create a test user and log in to get a valid token
    const userResponse = await request(app)
      .post('/register')
      .send({
        email: 'testprotected@example.com',
        password: 'password123',
        username: 'protecteduser',
      });

    const loginResponse = await request(app)
      .post('/login')
      .send({
        email: 'testprotected@example.com',
        password: 'password123',
      });

    const token = loginResponse.body.token;

    const response = await request(app)
      .get('/protected-route')  // Adjust this route if needed
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);  // Assuming success here
  });
});

// Clean up after tests
afterAll(async () => {
  // Close the Sequelize connection after all tests are completed
  await sequelizeInstance.close();
});
