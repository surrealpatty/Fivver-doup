import 'reflect-metadata';  // Ensure reflect-metadata is imported for sequelize-typescript
import { Request, Response, NextFunction, Application, MediaType } from 'express';
import { authenticateToken } from './authenticateToken';  // Adjust path if necessary
import { UserPayload } from '../types';  // Correct type for JWT payload

// Mock jsonwebtoken module
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

// Extend the Express Request type to allow 'user' to be of type UserPayload | undefined
interface RequestWithUser extends Request {
  user?: UserPayload; // Allow 'user' to be of type 'UserPayload' or undefined
}

describe('authenticateToken Middleware', () => {
  const mockNext = jest.fn(); // Mock next function
  let mockRequest: Partial<RequestWithUser>;  // Use the custom RequestWithUser type as a Partial
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {}; // Reset the mock request object
    mockResponse = {
      status: jest.fn().mockReturnThis(), // Mock the status function to chain
      json: jest.fn().mockReturnThis(), // Mock the json function to chain
    };
    mockNext.mockClear(); // Clear previous calls to next()
  });

  // Helper function to mock request with a user
  const mockRequestWithUser = (user: UserPayload | undefined): Partial<RequestWithUser> => ({
    headers: {
      authorization: 'Bearer validToken', // Add a valid token for testing
    },
    user, // Attach a user to the request if provided
    // Mocking just the methods used in the middleware
    get: jest.fn().mockReturnValue('Bearer validToken'),  // Mock get() method
    header: jest.fn().mockReturnValue('Bearer validToken'),  // Mock header() method
    accepts: jest.fn().mockReturnValue(true),  // Mock accepts() method
    acceptsCharsets: jest.fn(),  // Mock acceptsCharsets() method
    acceptsEncodings: jest.fn(),  // Mock acceptsEncodings() method
    app: {} as Application,  // Mock the app property as an empty object of type Application
    cookies: {},
    params: {},
    query: {},
    body: {},
    acceptsLanguages: jest.fn(), // Mock acceptsLanguages method
    range: jest.fn(), // Mock range method
    accepted: ['application/json'] as unknown as MediaType[], // Cast to MediaType[]
    param: jest.fn(), // Mock param method
    // Mock additional properties to prevent TypeScript errors (using empty or mock values)
    // These are the only properties needed to prevent TypeScript errors related to missing fields
    protocol: 'http',  // Add a mock value for protocol
    secure: false,  // Add a mock value for secure
    ip: '127.0.0.1',  // Add a mock value for ip
    originalUrl: '/',  // Add a mock value for originalUrl
    method: 'GET',  // Add a mock value for method
    url: '/',  // Add a mock value for url
    baseUrl: '/',  // Add a mock value for baseUrl
    path: '/',  // Add a mock value for path
    subdomains: [],  // Add a mock value for subdomains
    hostname: 'localhost',  // Add a mock value for hostname
    host: 'localhost',  // Add a mock value for host
  });

  it('should attach user to req.user if token is valid', () => {
    const mockToken = 'validToken';
    const mockPayload: UserPayload = { id: '123', email: 'user@example.com' }; // Define the expected payload

    // Set up the mock for jwt.verify to return the mockPayload
    (require('jsonwebtoken').verify as jest.Mock).mockReturnValue(mockPayload);

    // Mock request and set Authorization header
    mockRequest = mockRequestWithUser(mockPayload);

    // Call the middleware
    authenticateToken(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

    // Check if next() was called, meaning the middleware passed successfully
    expect(mockNext).toHaveBeenCalled();

    // Check if the user was attached to req.user
    expect(mockRequest.user).toEqual(mockPayload);
  });

  it('should return 401 if no token is provided', () => {
    mockRequest = {
      headers: {
        authorization: '', // No token provided
      },
    } as Partial<RequestWithUser>;

    authenticateToken(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Authorization token is missing' });
  });

  it('should return 403 if token is invalid or expired', () => {
    const mockToken = 'invalidToken';

    // Simulate jwt.verify throwing an error for invalid token
    (require('jsonwebtoken').verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    mockRequest = {
      headers: {
        authorization: `Bearer ${mockToken}`, // Ensure headers are properly mocked
      },
    } as Partial<RequestWithUser>;

    authenticateToken(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid or expired token' });
  });
});
