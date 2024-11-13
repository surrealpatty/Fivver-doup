import { User } from '../models/user';  // Adjust the path if needed
import * as jwt from 'jsonwebtoken';
import request from 'supertest';
import { app } from '../index';  // Ensure this path is correct

// Mock the User model
jest.mock('../models/user');

// Mock jwt module if necessary
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mockedToken'), // Mock token signing function
  verify: jest.fn(() => ({ userId: 1 })), // Mock token verification function
}));

describe('User Controller', () => {
  beforeAll(() => {
    // Mock necessary User model methods
    (User.findOne as jest.Mock).mockResolvedValue(null);  // Mock for registration (user not found)
    (User.create as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword',
    });  // Mock for user creation
    (User.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
    });  // Mock for finding user profile
    (User.update as jest.Mock).mockResolvedValue([1]);  // Mock for updating user profile
    (User.destroy as jest.Mock).mockResolvedValue(1);  // Mock for deleting user profile
  });

  afterAll(() => {
    jest.clearAllMocks();  // Clear all mocks after tests
  });

  test('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')  // Adjust the endpoint according to your route
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201); // Ensure the response status is 201 (Created)
    expect(response.body).toHaveProperty('id', 1); // Ensure the response contains the user ID
    expect(response.body).toHaveProperty('email', 'test@example.com'); // Ensure the response contains the email
  });

  test('should login a user and return a token', async () => {
    const response = await request(app)
      .post('/api/users/login')  // Adjust the endpoint according to your route
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200); // Ensure the response status is 200 (OK)
    expect(response.body).toHaveProperty('token', 'mockedToken'); // Ensure the response contains the mocked token
  });

  test('should return user profile', async () => {
    const response = await request(app)
      .get('/api/users/profile')
      .set('Authorization', 'Bearer mockedToken');  // Use mocked token for auth

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('email', 'test@example.com');
  });

  test('should update user profile', async () => {
    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', 'Bearer mockedToken')
      .send({
        email: 'updated@example.com',
        password: 'newpassword123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('email', 'updated@example.com');
  });

  test('should delete user account', async () => {
    const response = await request(app)
      .delete('/api/users/profile')
      .set('Authorization', 'Bearer mockedToken');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted successfully');
  });
});
