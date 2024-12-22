import { Request, Response, NextFunction } from 'express';
import { CustomAuthRequest } from '../types';  // Ensure correct import path
import { createOrder } from '../controllers/orderController';  // Correct import for the order controller
import { Order } from '../models/order';  // Correct import for the Order model
import { authenticateToken } from './middlewares/authenticateToken'; // Correct named import

// Mock Order model methods
jest.mock('../models/order');

describe('Order Controller', () => {
  let req: Partial<CustomAuthRequest>;  // Mocked request of type CustomAuthRequest
  let res: Partial<Response>;
  let next: jest.MockedFunction<NextFunction>;  // Correct type for next function

  beforeEach(() => {
    req = {
      // For authenticated users
      user: {
        id: '123',
        email: 'test@example.com',
        username: 'testuser',
        tier: 'free',
      } as CustomAuthRequest['user'],  // Cast to ensure the correct type for user

      body: {
        userId: 123,
        serviceId: 1,
        orderDetails: 'Test order',
        status: 'pending',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    next = jest.fn();  // Mocked next function
  });

  afterEach(() => {
    jest.clearAllMocks();  // Clean mocks after each test
  });

  test('createOrder should return 201 when order is successfully created', async () => {
    const mockOrder = {
      userId: 123,
      serviceId: 1,
      orderDetails: 'Test order',
      status: 'pending',
    };

    (Order.create as jest.Mock).mockResolvedValue(mockOrder);  // Mock Order.create to resolve with the mock order

    // Call the createOrder controller
    await createOrder(req as CustomAuthRequest, res as Response);  // Cast req to CustomAuthRequest

    // Verify the response status and JSON output
    expect(res.status).toHaveBeenCalledWith(201);  // Check status code 201 (created)
    expect(res.json).toHaveBeenCalledWith(mockOrder);  // Ensure the correct order data is returned
  });

  test('createOrder should return 500 when there is an error creating the order', async () => {
    (Order.create as jest.Mock).mockRejectedValue(new Error('Database error'));  // Mock Order.create to reject with an error

    // Call the createOrder controller
    await createOrder(req as CustomAuthRequest, res as Response);

    // Verify the response status and error message
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error creating order', error: expect.any(Error) });
  });

  test('authenticateToken should call next if user is authenticated', async () => {
    req.user = {
      id: '123',
      email: 'test@example.com',
      username: 'testuser',
      tier: 'free',
    } as CustomAuthRequest['user'];  // Cast to `UserPayload`

    // Call authenticateToken middleware
    await authenticateToken(req as CustomAuthRequest, res as Response, next);

    // Check that the next function was called
    expect(next).toHaveBeenCalledTimes(1);  // Ensure next is called once
  });

  test('authenticateToken should return 401 if no user is authenticated', async () => {
    req.user = undefined;  // Mock unauthenticated user (no user)

    // Call authenticateToken middleware
    await authenticateToken(req as CustomAuthRequest, res as Response, next);

    // Verify that the response status is 401 and error message
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'User is not authenticated or missing tier information' });
  });
});
