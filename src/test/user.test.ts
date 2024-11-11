import { app } from '../../src/app'; // Adjust if necessary
import request from 'supertest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock environment variable for JWT secret
process.env.JWT_SECRET = 'testsecret';

// Mocking jwt to avoid errors during tests
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

// Mock User model
jest.mock('../../src/models/user', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should register a new user', async () => {
    // Mocking User.findOne to return null to simulate user not found
    (User.findOne as jest.Mock).mockResolvedValue(null);
    // Mocking User.create to simulate successful user creation
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
    // Mocking User.findOne to simulate finding the user
    (User.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: hashedPassword,
    });

    const mockToken = 'mock.jwt.token';
    // Mocking jwt.sign to return a mock token
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
    // Mocking jwt.verify to return mock user data
    (jwt.verify as jest.Mock).mockReturnValue({ userId: 1 });

    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
    };
    // Mocking User.findByPk to return mock user data
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
    // Mocking User.update to simulate profile update
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
    // Mocking User.destroy to simulate account deletion
    (User.destroy as jest.Mock).mockResolvedValue(1);

    const response = await request(app)
      .delete('/api/users/profile')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted successfully');
  });
});
