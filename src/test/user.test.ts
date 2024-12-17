import request from 'supertest';
import app from '../index'; // Import the Express app
import { User } from '../models/user'; // Mock the User model

jest.mock('../models/user', () => ({
  User: {
    create: jest.fn(),
  },
}));

describe('POST /register', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test to avoid conflicts
  });

  it('should register a new user successfully', async () => {
    // Mock the User.create method to resolve with a user object
    (User.create as jest.Mock).mockResolvedValueOnce({
      id: '1',
      email: 'newuser@example.com',
      username: 'newuser',
      password: 'password123',
    });

    // Send request to the /register route
    const res = await request(app)
      .post('/register')
      .send({
        email: 'newuser@example.com',
        username: 'newuser',
        password: 'password123',
      });

    // Assertions
    expect(res.status).toBe(201); // Expect HTTP 201 (Created)
    expect(res.body.message).toBe('User registered successfully');
    expect(res.body.user).toEqual({
      id: '1',
      email: 'newuser@example.com',
      username: 'newuser',
    }); // Ensure no password in the response
  });

  it('should return an error if email or username is already in use', async () => {
    // Mock the User.create method to throw an error for existing user
    (User.create as jest.Mock).mockRejectedValueOnce(
      new Error('Email or Username already in use')
    );

    const res = await request(app)
      .post('/register')
      .send({
        email: 'existinguser@example.com',
        username: 'existinguser',
        password: 'password123',
      });

    // Assertions
    expect(res.status).toBe(400); // Expect HTTP 400 (Bad Request)
    expect(res.body.message).toBe('Email or Username already in use');
  });

  it('should return a validation error for invalid email', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'invalid-email',
        username: 'newuser',
        password: 'password123',
      });

    // Assertions
    expect(res.status).toBe(400); // Expect HTTP 400 (Bad Request)
    expect(res.body.errors[0].msg).toBe('Invalid email address');
  });

  it('should return a validation error for missing username', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'newuser@example.com',
        password: 'password123',
      });

    // Assertions
    expect(res.status).toBe(400); // Expect HTTP 400 (Bad Request)
    expect(res.body.errors[0].msg).toBe('Username is required');
  });

  it('should return a validation error for short password', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'newuser@example.com',
        username: 'newuser',
        password: '123',
      });

    // Assertions
    expect(res.status).toBe(400); // Expect HTTP 400 (Bad Request)
    expect(res.body.errors[0].msg).toBe('Password must be at least 6 characters');
  });
});
