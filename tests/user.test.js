import request from 'supertest';
import bcrypt from 'bcryptjs';  // Ensure bcryptjs is used since it's installed
import jwt from 'jsonwebtoken';
import { app } from '../index';  // Adjust path to match your main app export (ensure you have app exported from index.ts)
import { User } from '../models/user';  // Import User model (ensure path is correct)

process.env.JWT_SECRET = 'testsecret';  // Mock environment variable for JWT secret

// Mock JWT methods
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

// Mock User model
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
    // Mock behavior for findOne (user not found) and create (successful user creation)
    (User.findOne as jest.Mock).mockResolvedValue(null);  // Simulate user not found
    (User.create as jest.Mock).mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword',  // Hash simulated for test
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

    // Mock behavior for finding the user and returning hashed password
    (User.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: hashedPassword,
    });

    const mockToken = 'mock.jwt.token';
    // Mock jwt sign to return the mock token
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
    // Mock jwt verify to decode the token and return the user id
    (jwt.verify as jest.Mock).mockReturnValue({ userId: 1 });

    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
    };

    // Mock User.findByPk to return a mock user
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
    // Mock jwt verify to decode the token and return the user id
    (jwt.verify as jest.Mock).mockReturnValue({ userId: 1 });
    // Mock User.update to simulate a successful profile update
    (User.update as jest.Mock).mockResolvedValue([1]);

    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${mockToken}`)
      .send({ username: 'updatedUser' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Profile updated successfully');
  });

  test('should delete user account', async () => {
    const mockToken = 'mock.jwt.token';
    // Mock jwt verify to decode the token and return the user id
    (jwt.verify as jest.Mock).mockReturnValue({ userId: 1 });
    // Mock User.destroy to simulate successful user deletion
    (User.destroy as jest.Mock).mockResolvedValue(1);

    const response = await request(app)
      .delete('/api/users/profile')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted successfully');
  });
});
