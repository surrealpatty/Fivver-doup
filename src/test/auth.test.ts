import 'reflect-metadata'; // Ensure this is the first import in the test file
import { Sequelize } from 'sequelize-typescript'; // Correct import for Sequelize
import { app } from '../index'; // Correct import for the app
import request from 'supertest';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for JWT verification
import dotenv from 'dotenv'; // Import dotenv to load environment variables
import { sequelize } from '../config/database'; // Correct import for sequelize instance
import { User } from '../models/user'; // User model import
import { Service } from '../models/services'; // Service model import

// Load environment variables from .env file
dotenv.config();

// Initialize Sequelize instance for testing
let sequelizeInstance: Sequelize;

beforeAll(async () => {
  sequelizeInstance = new Sequelize({
    dialect: 'mysql',
    host: process.env.TEST_DB_HOST, // Use environment variables for DB configuration
    username: process.env.TEST_DB_USERNAME as string,
    password: process.env.TEST_DB_PASSWORD as string,
    database: process.env.TEST_DB_NAME as string,
    models: [User, Service], // Add models to Sequelize instance
  });

  // Log models to check if they are correctly imported
  console.log('User Model:', User);
  console.log('Service Model:', Service);

  // Add models to Sequelize instance and define associations
  sequelizeInstance.addModels([User, Service]);

  // Define associations
  Service.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(Service, { foreignKey: 'userId' });

  // Test database connection and sync models
  await sequelizeInstance.authenticate();
  await sequelizeInstance.sync({ force: true });
});

describe('Authentication Tests', () => {
  it('should authenticate and return a valid JWT token', async () => {
    // Create a test user
    const userResponse = await request(app)
      .post('/users/register') // Ensure the correct registration route
      .send({
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
      });

    // Validate user creation
    expect(userResponse.status).toBe(201);
    expect(userResponse.body.token).toBeDefined(); // Ensure token is returned

    // Authenticate the user (login)
    const response = await request(app)
      .post('/users/login') // Ensure the correct login route
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    // Validate login response
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined(); // Ensure token is returned

    // Verify the JWT token
    const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET || 'your-secret-key');
    expect(decoded).toHaveProperty('id');
    expect(decoded).toHaveProperty('email');
  });

  it('should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/users/login') // Ensure the correct login route
      .send({
        email: 'invalid@example.com',
        password: 'wrongpassword',
      });

    // Validate error response
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials.');
  });
});

afterAll(async () => {
  // Close the Sequelize connection after tests
  await sequelizeInstance.close();
});
