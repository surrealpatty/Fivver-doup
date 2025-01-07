import { Request, Response } from 'express';
import { UserPayload } from '../types'; // Assuming UserPayload is defined in your types
import { registerUser } from '../controllers/userController'; // Example import of the registerUser controller
import { generateToken } from '../utils/jwt'; // If needed for your tests
import User from '../models/user'; // If you need to mock the User model

// Mock User with proper type for role
const mockUser: UserPayload = {
  id: '123',
  email: 'test@example.com',
  username: 'testuser',
  role: 'user',  // Ensure this matches the UserRole type
  tier: 'free',
  isVerified: false,
};

// Example test case
describe('User Registration Controller', () => {
  it('should register a user successfully', async () => {
    // Mock the User.create method to return the mock user
    jest.spyOn(User, 'create').mockResolvedValue(mockUser as any);

    // Define the body type for the mock Request object
    const req = {
      body: {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      },
    } as Request<{}, {}, { email: string; username: string; password: string }>; // Mocking the Request type correctly

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Call the registerUser function
    await registerUser(req, res);

    // Assert that the correct status and response are returned
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User registered successfully',
      user: {
        id: '123',
        email: 'test@example.com',
        username: 'testuser',
        role: 'user',  // Ensure this is correct
        tier: 'free',
        isVerified: false,
        createdAt: expect.any(String), // Assuming createdAt is returned as a string
      },
      token: expect.any(String), // Assuming a token is generated
    });
  });

  it('should handle user registration failure due to existing email', async () => {
    // Mock the User.findOne method to simulate existing user
    jest.spyOn(User, 'findOne').mockResolvedValue(mockUser as any);

    const req = {
      body: {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      },
    } as Request<{}, {}, { email: string; username: string; password: string }>; // Mocking the Request type correctly

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Call the registerUser function
    await registerUser(req, res);

    // Assert that the correct status and error message are returned
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'User already exists with this email.' });
  });
});
