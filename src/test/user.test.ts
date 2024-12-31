import request from 'supertest';
import { User } from '../models/user'; // Corrected relative import
import jwt from 'jsonwebtoken'; // For mocking token validation
import app from '../index'; // Corrected the import path

// Mocking the User model and JWT methods
jest.mock('../models/user', () => ({
  User: {
    create: jest.fn(),
    findOne: jest.fn(),
  },
}));
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('User Tests', () => {
  describe('POST /api/users/register', () => {
    it('should register a user successfully', async () => {
      // Mock resolved value for User.create
      (User.create as jest.Mock).mockResolvedValueOnce({
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
      });

      // Send a POST request to register endpoint
      const response = await request(app).post('/api/users/register').send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      });

      // Verify the response
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe('test@example.com');
      expect(User.create).toHaveBeenCalledWith({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      });
    });

    it('should return an error if email is already taken', async () => {
      // Mock rejected value for User.create
      (User.create as jest.Mock).mockRejectedValueOnce(new Error('Email already exists'));

      const response = await request(app).post('/api/users/register').send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Email already exists');
    });
  });

  describe('Role-based Access Control', () => {
    beforeEach(() => {
      // Mock JWT.verify to simulate token validation
      (jwt.verify as jest.Mock).mockImplementation((token: string) => {
        if (token === 'valid_paid_user_token') {
          return { role: 'paid' };
        } else if (token === 'valid_free_user_token') {
          return { role: 'free' };
        } else {
          throw new Error('Invalid token');
        }
      });
    });

    it('should allow access to paid users', async () => {
      const response = await request(app)
        .get('/premium-content')
        .set('Authorization', 'Bearer valid_paid_user_token');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Welcome to the premium content!');
    });

    it('should deny access to free users for premium content', async () => {
      const response = await request(app)
        .get('/premium-content')
        .set('Authorization', 'Bearer valid_free_user_token');

      expect(response.status).toBe(403);
      expect(response.body.message).toBe('Access forbidden: Insufficient role');
    });

    it('should allow access to free content for all users', async () => {
      const response = await request(app)
        .get('/free-content')
        .set('Authorization', 'Bearer valid_free_user_token');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Welcome to the free content!');
    });

    it('should return an error for invalid tokens', async () => {
      const response = await request(app)
        .get('/premium-content')
        .set('Authorization', 'Bearer invalid_token');

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized');
    });
  });
});
