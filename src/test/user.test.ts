import 'reflect-metadata'; // Ensure Sequelize decorators work properly
import request from 'supertest';
import jwt from 'jsonwebtoken'; // For mocking token validation
import { User } from 'src/models/user'; // Corrected to import from src/ instead of dist/
import app  from 'src/index';         // Corrected to import from src/ instead of dist/

// Mocking the User model and JWT methods for testing
jest.mock('../dist/models/user', () => ({
  User: {
    create: jest.fn(),
    findOne: jest.fn(),
  },
}));

// Mocking JWT methods for testing
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('User Tests', () => {
  // Test: Successful user registration
  it('should register a user successfully', async () => {
    // Mock resolved value for User.create
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

    // Verify the response
    expect(response.status).toBe(201);  // Expecting a 201 Created status
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('test@example.com');

    // Verify that User.create was called with the correct parameters
    expect(User.create).toHaveBeenCalledWith({
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
      isVerified: false,
      role: 'user',
      tier: 'free',
    });
  });

  // Test: Registration failure due to missing required data
  it('should fail with missing data', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        email: 'test@example.com',
        // No password field to simulate an error
      });

    expect(response.status).toBe(400);  // Expecting a 400 Bad Request status
    expect(response.body).toHaveProperty('error', 'Password is required');
  });

  // Test: Error when email already exists
  it('should return an error if email is already taken', async () => {
    (User.create as jest.Mock).mockRejectedValueOnce(new Error('Email already exists'));

    const response = await request(app)
      .post('/api/users/register')
      .send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      });

    expect(response.status).toBe(400);  // Expecting a 400 Bad Request status
    expect(response.body).toHaveProperty('error', 'Email already exists');
  });

  // Test: Access control based on JWT roles (Example for premium content access)
  describe('Role-based Access Control', () => {
    beforeEach(() => {
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

    // Test: Paid users can access premium content
    it('should allow access to premium content for paid users', async () => {
      const response = await request(app)
        .get('/premium-content')
        .set('Authorization', 'Bearer valid_paid_user_token');

      expect(response.status).toBe(200);  // Expecting a 200 OK status
      expect(response.body.message).toBe('Welcome to the premium content!');
    });

    // Test: Free users cannot access premium content
    it('should deny access to free users for premium content', async () => {
      const response = await request(app)
        .get('/premium-content')
        .set('Authorization', 'Bearer valid_free_user_token');

      expect(response.status).toBe(403);  // Expecting a 403 Forbidden status
      expect(response.body.message).toBe('Access forbidden: Insufficient role');
    });

    // Test: Free users can access free content
    it('should allow access to free content for all users', async () => {
      const response = await request(app)
        .get('/free-content')
        .set('Authorization', 'Bearer valid_free_user_token');

      expect(response.status).toBe(200);  // Expecting a 200 OK status
      expect(response.body.message).toBe('Welcome to the free content!');
    });

    // Test: Invalid token access should result in an error
    it('should return an error for invalid tokens', async () => {
      const response = await request(app)
        .get('/premium-content')
        .set('Authorization', 'Bearer invalid_token');

      expect(response.status).toBe(401);  // Expecting a 401 Unauthorized status
      expect(response.body.message).toBe('Unauthorized');
    });
  });
});
