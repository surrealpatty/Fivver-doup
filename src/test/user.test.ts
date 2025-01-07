import request from 'supertest';
import { app } from '../index';  // Import your Express app
import { User } from '../models/user';  // Assuming User is the Sequelize model
import bcrypt from 'bcryptjs';

describe('User Controller', () => {
  beforeAll(async () => {
    // Optional: Set up any needed preconditions before tests run
  });

  afterAll(async () => {
    // Optional: Clean up database after tests run
    await User.destroy({ where: {} });  // Example cleanup of users table
  });

  it('should create a new user', async () => {
    const userPayload = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      role: 'user',  // Add the missing role field
      isVerified: true,  // Add the missing isVerified field
    };

    const response = await request(app).post('/api/users/signup').send(userPayload);

    // Ensure that the response status is 201 (Created)
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body.user.username).toBe(userPayload.username);
    expect(response.body.token).toBeDefined();  // Check that the token is returned
    // Ensure password is not included in the response
    expect(response.body.user.password).toBeUndefined();
  });

  it('should not create a user if email already exists', async () => {
    // First, create a user
    await User.create({
      username: 'existinguser',
      email: 'existinguser@example.com',
      password: 'password123',
      role: 'user',  // Add missing field
      isVerified: true,  // Add missing field
    });

    const userPayload = {
      username: 'testuser',
      email: 'existinguser@example.com',  // Same email
      password: 'password123',
      role: 'user',  // Add missing field
      isVerified: true,  // Add missing field
    };

    const response = await request(app).post('/api/users/signup').send(userPayload);

    // Expect a conflict (409) status due to duplicate email
    expect(response.status).toBe(409);
    expect(response.body.message).toBe('User already exists with this email.');
  });

  it('should login a user with valid credentials', async () => {
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with a hashed password
    const existingUser = await User.create({
      username: 'loginuser',
      email: 'loginuser@example.com',
      password: hashedPassword,
      role: 'user',  // Add missing field
      isVerified: true,  // Add missing field
    });

    const loginPayload = {
      email: existingUser.email,
      password: 'password123',  // Correct password
    };

    const response = await request(app).post('/api/users/login').send(loginPayload);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.token).toBeDefined();  // Check that the token is returned
  });

  it('should not login a user with invalid credentials', async () => {
    const loginPayload = {
      email: 'nonexistentuser@example.com',
      password: 'wrongpassword',
    };

    const response = await request(app).post('/api/users/login').send(loginPayload);

    expect(response.status).toBe(401);  // Unauthorized status for invalid credentials
    expect(response.body.message).toBe('Invalid credentials');
  });
});
