import request from 'supertest';
import { app } from '../index';  // Ensure the path to your app is correct
import { User } from '../models/user';  // Correct import for the User model
import jwt from 'jsonwebtoken';

jest.mock('../models/user', () => ({
  User: {
    create: jest.fn(),
    findOne: jest.fn(),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

beforeAll(async () => {
  // Any database setup or mock initialization can be done here, such as Sequelize model sync
  // If you are using Sequelize, ensure models are synced with the database before running tests
  // Example:
  // await sequelize.sync({ force: true }); // Uncomment and ensure sequelize is imported correctly
});

describe('User Tests', () => {
  it('should register a user successfully', async () => {
    // Mocking Sequelize's create method
    (User.create as jest.Mock).mockResolvedValueOnce({
      id: '1',  // UUID should be returned here
      email: 'test@example.com',
      username: 'testuser',
      isVerified: false,
      role: 'user',
      tier: 'free',
    });

    const response = await request(app)
      .post('/api/users/register')
      .send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      });

    // Test that the response status is correct
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('test@example.com');

    // Ensure that the `User.create` method was called with the correct parameters
    expect(User.create).toHaveBeenCalledWith({
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
      isVerified: false,
      role: 'user',
      tier: 'free',
    });
  });

  // You can add more test cases for other functionalities here
});
