import request from 'supertest';
import bcrypt from 'bcryptjs';  // Ensure bcryptjs is used since it's installed
import jwt from 'jsonwebtoken';
import { app } from '../index';  // Adjust path to match your main app export
import { User } from '../models/user';  // Import User model

// Mock environment variable for JWT secret
process.env.JWT_SECRET = 'testsecret';

// Mocking jwt to avoid errors during tests
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

// Mock User model with Jest
jest.mock('../models/user', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

describe('User Controller', () => {
  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should register a new user', async () => {
    // Mock behavior for findOne and create methods
    (User.findOne as jest.Mock).mockResolvedValue(null);  // Simulate user not found
    (User.create as jest.Mock).mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword',
    });

    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('username', 'testuser');
    expect(response.body).toHaveProperty('email', 'test@example.com');
  });

  test('should login a user and return a token', async () => {
    const hashedPassword = await bcrypt.hash('testpassword', 10);
    (User.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: hashedPassword,
    });

    const mockToken = 'mock.jwt.token';
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'testpassword',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token', mockToken);
  });

  test('should return user profile', async () => {
    const mockToken = 'mock.jwt.token';
    (jwt.verify as jest.Mock).mockReturnValue({ userId: 1 });

    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
    };
    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
    expect(response.body).toHaveProperty('email', 'test@example.com');
  });

  test('should update user profile', async () => {
    const mockToken = 'mock.jwt.token';
    (jwt.verify as jest.Mock).mockReturnValue({ userId: 1 });
    (User.update as jest.Mock).mockResolvedValue([1]); // Sequelize returns an array [1] on success

    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${mockToken}`)
      .send({ username: 'updatedUser' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Profile updated successfully');
  });

  test('should delete user account', async () => {
    const mockToken = 'mock.jwt.token';
    (jwt.verify as jest.Mock).mockReturnValue({ userId: 1 });
    (User.destroy as jest.Mock).mockResolvedValue(1); // Sequelize returns 1 on successful destroy

    const response = await request(app)
      .delete('/api/users/profile')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted successfully');
  });
});
