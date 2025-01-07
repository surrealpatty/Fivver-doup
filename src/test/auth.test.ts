import 'reflect-metadata'; // Ensure this is the first import in the test file
import request from 'supertest';
import { app } from '../index';  // Import your app instance from index.ts
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for JWT verification
import dotenv from 'dotenv'; // Import dotenv to load environment variables
import { Sequelize } from 'sequelize'; // Import Sequelize from the sequelize package
import { User } from '../models/user'; // User model import
import { Service } from '../models/services'; // Service model import

// Load environment variables from .env file
dotenv.config();

// Initialize Sequelize instance for testing
let sequelizeInstance: Sequelize; // Explicitly define the type as Sequelize

beforeAll(async () => {
  // Initialize Sequelize instance for testing without models option
  sequelizeInstance = new Sequelize({
    dialect: 'mysql',
    host: process.env.TEST_DB_HOST,
    username: process.env.TEST_DB_USERNAME as string,
    password: process.env.TEST_DB_PASSWORD as string,
    database: process.env.TEST_DB_NAME as string,
  });

  // Manually set models after Sequelize instance initialization
  sequelizeInstance.models.User = User; // Manually assign models
  sequelizeInstance.models.Service = Service;

  // Define associations manually
  Service.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(Service, { foreignKey: 'userId' });

  // Test database connection and sync models
  await sequelizeInstance.authenticate();
  await sequelizeInstance.sync({ force: true }); // Force sync to ensure clean database state
});

describe('Authentication Tests', () => {
  it('should authenticate and return a valid JWT token', async () => {
    // Step 1: Create a test user
    const userResponse = await request(app)
      .post('/users/register') // Ensure the correct registration route
      .send({
        email: 'testuser@example.com',
        password: 'validpassword',
        username: 'testuser',
      });

    expect(userResponse.status).toBe(201);  // Validate user creation
    expect(userResponse.body.token).toBeDefined(); // Ensure token is returned

    // Step 2: Authenticate the user (login)
    const loginResponse = await request(app)
      .post('/users/login') // Ensure the correct login route
      .send({
        email: 'testuser@example.com',
        password: 'validpassword',
      });

    expect(loginResponse.status).toBe(200);  // Adjusted to expect 200 (success)
    expect(loginResponse.body.token).toBeDefined(); // Ensure token is returned

    // Step 3: Verify the JWT token
    const decoded = jwt.verify(loginResponse.body.token, process.env.JWT_SECRET || 'your-secret-key');
    expect(decoded).toHaveProperty('id');
    expect(decoded).toHaveProperty('email');
  });

  it('should reject invalid credentials', async () => {
    const invalidLoginResponse = await request(app)
      .post('/users/login') // Ensure the correct login route
      .send({
        email: 'invaliduser@example.com',
        password: 'wrongpassword',
      });

    expect(invalidLoginResponse.status).toBe(401); // Check for unauthorized status
    expect(invalidLoginResponse.body.message).toBe('Invalid credentials'); // Validate error message
  });
});

afterAll(async () => {
  // Close the Sequelize connection after tests
  await sequelizeInstance.close();
});
