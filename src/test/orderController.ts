import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types';  // Correct import for AuthRequest type
import { createOrder } from '../controllers/orderController';  // Correct import for the order controller
import { Order } from '../models/order';  // Correct import for the Order model
import { sequelize } from '../config/database';  // Correct import for sequelize
import { authenticateToken } from '../middleware/authenticateToken';  // Correct named import

// Mock Order model methods
jest.mock('../models/order');

describe('Order Controller', () => {
  let req: Partial<AuthRequest>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      user: {
        id: '123',
        tier: 'free',  // Mock user with 'tier'
      },
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

    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createOrder should return 201 when order is successfully created', async () => {
    // Mock Order.create to resolve with the order object
    const mockOrder = {
      userId: 123,
      serviceId: 1,
      orderDetails: 'Test order',
      status: 'pending',
    };
    (Order.create as jest.Mock).mockResolvedValue(mockOrder);

    // Call the createOrder controller
    await createOrder(req as AuthRequest, res as Response);

    // Verify the response status and JSON output
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockOrder);
  });

  test('createOrder should return 500 when there is an error creating the order', async () => {
    // Mock Order.create to reject with an error
    (Order.create as jest.Mock).mockRejectedValue(new Error('Database error'));

    // Call the createOrder controller
    await createOrder(req as AuthRequest, res as Response);

    // Verify the response status and error message
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error creating order', error: expect.any(Error) });
  });

  test('authenticateToken should call next if user is authenticated', async () => {
    // Mock req.user as an authenticated user
    req.user = { id: '123', tier: 'free' };

    // Call authenticateToken middleware
    await authenticateToken(req as AuthRequest, res as Response, next);

    // Check that the next function was called
    expect(next).toHaveBeenCalled();
  });

  test('authenticateToken should return 401 if no user is authenticated', async () => {
    // Mock req.user as undefined (no user authenticated)
    req.user = undefined;

    // Call authenticateToken middleware
    await authenticateToken(req as AuthRequest, res as Response, next);

    // Verify that the response status is 401
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'User is not authenticated or missing tier information' });
  });
});
