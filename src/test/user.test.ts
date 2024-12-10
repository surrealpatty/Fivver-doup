// src/test/user.test.ts
import request from 'supertest';
import { app } from '../index';  // Correct import for the app instance

// Mocking the User model to mock the create function for testing
import { User } from '../models/user'; 
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
    // Mock the User.create method
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
    expect(res.status).toBe(201);  // Expect HTTP 201 (Created)
    expect(res.body.message).toBe('User registered successfully');  // Response message
    expect(res.body.user).toEqual({
      id: '1',
      email: 'newuser@example.com',
      username: 'newuser',
      password: 'password123',  // Ensure the mocked password is correct
    });
  });

  it('should return an error if email or username is already in use', async () => {
    // Mock the User.create method to simulate an existing user
    (User.create as jest.Mock).mockRejectedValueOnce(new Error('User already exists'));

    const res = await request(app)
      .post('/register')
      .send({
        email: 'existinguser@example.com',
        username: 'existinguser',
        password: 'password123',
      });

    // Assertions
    expect(res.status).toBe(400);  // Expect HTTP 400 (Bad Request)
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
    expect(res.status).toBe(400);  // Expect HTTP 400 (Bad Request)
    expect(res.body.errors[0].msg).toBe('Invalid email address');  // Validation error message
  });

  it('should return a validation error for missing username', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'newuser@example.com',
        password: 'password123',
      });

    // Assertions
    expect(res.status).toBe(400);  // Expect HTTP 400 (Bad Request)
    expect(res.body.errors[0].msg).toBe('Username must be between 3 and 20 characters');  // Username error
  });
});
