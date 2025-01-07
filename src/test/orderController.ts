// src/test/orderController.ts

import { Request, Response } from 'express';
import { UserPayload } from '../types'; // Assuming UserPayload is defined in your types
import { registerUser } from '../controllers/userController'; // Adjust import if needed
import { User } from '../models/user'; // Import the User model

// Mock user payload for testing
const mockUser: UserPayload = {
  id: '123',
  email: 'test@example.com',
  username: 'testuser',
  role: 'user',
  tier: 'free',
  isVerified: false,
};

describe('User Registration Controller', () => {
  it('should register a user successfully', async () => {
    // Mock the User.create method
    jest.spyOn(User, 'create').mockResolvedValue({
      ...mockUser,
      createdAt: new Date().toISOString(), // Add createdAt field for response
    } as any);

    // Mock request and response objects
    const req = {
      body: {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Call the controller
    await registerUser(req, res);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(201); // Expect 201 Created
    expect(res.json).toHaveBeenCalledWith({
      message: 'User registered successfully',
      user: {
        id: '123',
        email: 'test@example.com',
        username: 'testuser',
        role: 'user',
        tier: 'free',
        isVerified: false,
        createdAt: expect.any(String), // Validate createdAt
      },
      token: expect.any(String), // Token should be returned
    });
  });

  it('should handle user registration failure due to existing email', async () => {
    // Mock User.findOne to simulate an existing user
    jest.spyOn(User, 'findOne').mockResolvedValue(mockUser as any);

    // Mock request and response objects
    const req = {
      body: {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Call the controller
    await registerUser(req, res);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(409); // Expect 409 Conflict
    expect(res.json).toHaveBeenCalledWith({
      message: 'User already exists with this email.',
    });
  });
});
