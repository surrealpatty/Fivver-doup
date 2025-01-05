import request from 'supertest';
import { app } from '../index';  // Adjust path as needed
import { User } from '../models/user';  // Correct import for User model
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
  // Any database setup or mock initialization can be done here
});

describe('User Tests', () => {
  it('should register a user successfully', async () => {
    (User.create as jest.Mock).mockResolvedValueOnce({
      id: '1',
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

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('test@example.com');
    expect(User.create).toHaveBeenCalledWith({
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
      isVerified: false,
      role: 'user',
      tier: 'free',
    });
  });
});
