import 'reflect-metadata'; // Ensure this is the first import
import request from 'supertest';
import { app } from '../index'; // Import your app instance
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token verification
import dotenv from 'dotenv'; // Import dotenv to load environment variables
import { Sequelize } from 'sequelize'; // Import Sequelize for database operations
import { User } from '../models/user'; // Import User model
import { Service } from '../models/services'; // Import Service model

dotenv.config(); // Load environment variables

let sequelizeInstance: Sequelize; // Initialize Sequelize instance

beforeAll(async () => {
  sequelizeInstance = new Sequelize({
    dialect: 'mysql',
    host: process.env.TEST_DB_HOST,
    username: process.env.TEST_DB_USERNAME!,
    password: process.env.TEST_DB_PASSWORD!,
    database: process.env.TEST_DB_NAME!,
  });

  // Set models and define associations
  sequelizeInstance.models.User = User;
  sequelizeInstance.models.Service = Service;

  Service.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(Service, { foreignKey: 'userId' });

  // Authenticate and sync models
  await sequelizeInstance.authenticate();
  await sequelizeInstance.sync({ force: true });
});

describe('Authentication Tests', () => {
  it('should register a user and return a valid JWT token', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({
        email: 'authuser@example.com',
        password: 'securepassword',
        username: 'authuser',
      });

    expect(response.status).toBe(201); // Ensure user is created successfully
    expect(response.body.token).toBeDefined(); // Verify token is returned

    const decoded = jwt.verify(
      response.body.token,
      process.env.JWT_SECRET || 'your-secret-key'
    );
    expect(decoded).toHaveProperty('id'); // Verify token contains user ID
  });

  it('should login a user and return a valid JWT token', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'authuser@example.com',
        password: 'securepassword',
      });

    expect(response.status).toBe(200); // Ensure login is successful
    expect(response.body.token).toBeDefined(); // Verify token is returned

    const decoded = jwt.verify(
      response.body.token,
      process.env.JWT_SECRET || 'your-secret-key'
    );
    expect(decoded).toHaveProperty('id'); // Verify token contains user ID
    expect(decoded).toHaveProperty('email'); // Verify token contains email
  });

  it('should reject login with invalid credentials', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'invaliduser@example.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401); // Unauthorized status
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should reject a request with an expired token', async () => {
    const expiredToken = jwt.sign(
      { id: 1, email: 'authuser@example.com' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '-1s' } // Token is already expired
    );

    const response = await request(app)
      .get('/protected-route') // Replace with your protected route
      .set('Authorization', `Bearer ${expiredToken}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });

  it('should reject a request with a malformed token', async () => {
    const response = await request(app)
      .get('/protected-route') // Replace with your protected route
      .set('Authorization', 'Bearer malformed.token.value');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });
});

afterAll(async () => {
  await sequelizeInstance.close(); // Close the Sequelize connection
});
