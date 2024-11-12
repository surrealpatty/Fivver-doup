import request from 'supertest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { app } from '../index';  // Adjust path to match the main app export
import { User } from '../models/user';  // Adjust path to your User model

// Set up a mock JWT secret for testing
process.env.JWT_SECRET = 'testsecret';

// Mock jwt and User model methods
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

jest.mock('../models/user', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();  // Reset all mocks after each test
  });

  test('should register a new user', async () => {
    // Mock findOne to simulate that the user does not already exist
    (User.findOne as jest.Mock).mockResolvedValue(null);
    // Mock create to simulate successful user creation
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

    // Mock findOne to simulate a user with the hashed password
    (User.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: hashedPassword,
    });

    const mockToken = 'mock.jwt.token';
    // Mock jwt.sign to return a test token
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
    // Mock jwt.verify to decode the token and return a mock user id
    (jwt.verify as jest.Mock).mockReturnValue({ userId: 1 });

    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
    };

    // Mock findByPk to return a user profile
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
    // Mock jwt.verify to decode the token and return a mock user id
    (jwt.verify as jest.Mock).mockReturnValue({ userId: 1 });
    // Mock update to simulate a successful update
    (User.update as jest.Mock).mockResolvedValue([1]);  // Sequelize returns [1] on successful update

    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${mockToken}`)
      .send({ username: 'updatedUser' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Profile updated successfully');
  });

  test('should delete user account', async () => {
    const mockToken = 'mock.jwt.token';
    // Mock jwt.verify to decode the token and return a mock user id
    (jwt.verify as jest.Mock).mockReturnValue({ userId: 1 });
    // Mock destroy to simulate user deletion
    (User.destroy as jest.Mock).mockResolvedValue(1);  // Sequelize returns 1 on successful deletion

    const response = await request(app)
      .delete('/api/users/profile')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted successfully');
  });
});
