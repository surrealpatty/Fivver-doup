import request from 'supertest';
import app from '../index';  // Ensure this points to your main Express app
import jwt from 'jsonwebtoken';
import  User  from '../models/user'; // Import the User model for mocking

// Set Jest timeout to 30 seconds for this test file
jest.setTimeout(30000);

// Mock the User model to simulate database interactions for testing
jest.mock('../models/user', () => ({
  create: jest.fn(),
  findOne: jest.fn(),
}));

// Setup valid test tokens for free and paid users
const paidToken = jwt.sign({ id: '1', role: 'Paid' }, process.env.JWT_SECRET as string);
const freeToken = jwt.sign({ id: '2', role: 'Free' }, process.env.JWT_SECRET as string);

describe('POST /api/users/register', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  it('should register a user successfully', async () => {
    // Mock successful user creation
    (User.create as jest.Mock).mockResolvedValueOnce({
      id: '1',
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123', // You can mock a hashed password if necessary
    });

    const response = await request(app)
      .post('/api/users/register') // Correct route path
      .send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      });

    // Assertions
    expect(response.status).toBe(201); // Expect status 201 Created
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body.user).toEqual({
      id: '1',
      email: 'test@example.com',
      username: 'testuser',
    });
  });

  it('should return an error if email is missing', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    // Assertions
    expect(response.status).toBe(400); // Bad request due to missing email
    expect(response.body.errors[0].msg).toBe('Email is required');
  });

  it('should return an error if username is missing', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    // Assertions
    expect(response.status).toBe(400); // Bad request due to missing username
    expect(response.body.errors[0].msg).toBe('Username is required');
  });

  it('should return an error if password is too short', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        email: 'test@example.com',
        username: 'testuser',
        password: '123', // Password too short
      });

    // Assertions
    expect(response.status).toBe(400); // Bad request due to short password
    expect(response.body.errors[0].msg).toBe('Password must be at least 6 characters');
  });

  it('should return an error if email is already in use', async () => {
    // Mock rejection for existing email/username
    (User.create as jest.Mock).mockRejectedValueOnce(
      new Error('Email or Username already in use')
    );

    const response = await request(app)
      .post('/api/users/register')
      .send({
        email: 'existinguser@example.com',
        username: 'existinguser',
        password: 'password123',
      });

    // Assertions
    expect(response.status).toBe(400); // Bad request due to existing email/username
    expect(response.body.message).toBe('Email or Username already in use');
  });
});

describe('GET /services/premium', () => {
  it('should allow access to paid user', async () => {
    const response = await request(app)
      .get('/services/premium')
      .set('Authorization', `Bearer ${paidToken}`); // Pass the token in the Authorization header

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Premium service access granted.');
  });

  it('should reject access to free user', async () => {
    const response = await request(app)
      .get('/services/premium')
      .set('Authorization', `Bearer ${freeToken}`);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
  });

  it('should return error if no token is provided', async () => {
    const response = await request(app)
      .get('/services/premium');

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Token is required');
  });

  it('should return error if token is invalid', async () => {
    const invalidToken = 'invalidToken123';
    const response = await request(app)
      .get('/services/premium')
      .set('Authorization', `Bearer ${invalidToken}`);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Invalid or expired token');
  });
});
