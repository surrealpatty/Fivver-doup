import request from 'supertest';
import app from '../index'; // Corrected the import for the main app file
import { User } from '../models/user'; // Mocking the User model

jest.mock('../models/user', () => ({
  User: {
    create: jest.fn(),
  },
}));

describe('POST /register', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  it('should register a user successfully', async () => {
    // Mock successful user creation
    (User.create as jest.Mock).mockResolvedValueOnce({
      id: '1',
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
    });

    const response = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      });

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body.user).toEqual({
      id: '1',
      email: 'test@example.com',
      username: 'testuser',
    });
  });

  it('should return an error if email is missing', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('Email is required');
  });

  it('should return an error if username is missing', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('Username is required');
  });

  it('should return an error if password is too short', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        username: 'testuser',
        password: '123',
      });

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('Password must be at least 6 characters');
  });

  it('should return an error if email is already in use', async () => {
    // Mock rejection for existing email/username
    (User.create as jest.Mock).mockRejectedValueOnce(
      new Error('Email or Username already in use')
    );

    const response = await request(app)
      .post('/register')
      .send({
        email: 'existinguser@example.com',
        username: 'existinguser',
        password: 'password123',
      });

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email or Username already in use');
  });
});
