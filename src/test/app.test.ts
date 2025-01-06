import 'reflect-metadata';  // Ensure reflect-metadata is imported first for sequelize-typescript
import { Sequelize } from 'sequelize-typescript';  // Import Sequelize from sequelize-typescript
import { app } from '../index';  // Import the app to be tested
import request from 'supertest';  // For making HTTP requests to your app
import jwt from 'jsonwebtoken';  // For verifying JWT tokens
import dotenv from 'dotenv';  // To load environment variables
import { sequelize } from '../config/database';  // Correct import for sequelize instance
import Service from '../models/services';  // Correct import for the Service model
import { User } from '../models/user';  // Correct import for the User model

dotenv.config();  // Load environment variables from .env file

let sequelizeInstance: Sequelize;

beforeAll(async () => {
  // Initialize Sequelize with models explicitly
  sequelizeInstance = new Sequelize({
    dialect: 'mysql',
    host: process.env.TEST_DB_HOST,
    username: process.env.TEST_DB_USERNAME as string,
    password: process.env.TEST_DB_PASSWORD as string,
    database: process.env.TEST_DB_NAME as string,
    models: [User, Service],  // Add models to Sequelize instance
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
    const response = await request(app)
      .post('/login')  // Adjust the login route based on your app's setup
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    // Ensure the login was successful and the token is returned
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();  // Ensure a token is returned

    // Decode the token to verify its contents
    const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET || 'your-secret-key');
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
});

// Clean up after tests
afterAll(async () => {
  // Close the Sequelize connection after all tests are completed
  await sequelizeInstance.close();
});
