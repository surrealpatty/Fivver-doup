// src/routes/orderRoutes.ts

import { Router, RequestHandler, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Correct path for authenticateToken middleware
import { CustomAuthRequest } from '../types'; // Correct path for CustomAuthRequest type
import { UserPayload } from '../types'; // Correct path for UserPayload type

const router = Router();

/**
 * Route to fetch order details.
 * Requires authentication.
 */
const getOrderDetailsHandler: RequestHandler = async (
  req: CustomAuthRequest,  // Cast request to CustomAuthRequest
  res: Response, 
  next: NextFunction
): Promise<Response> => {
  try {
    // Ensure req.user is defined and is of type UserPayload (email should be a string)
    const user = req.user as UserPayload;  // Type assertion to UserPayload

    if (!user || !user.email) {
      return res.status(401).json({ message: 'Unauthorized: Missing user info' });
    }

    const { id: userId } = user; // Destructure user ID from req.user
    const { orderId } = req.params; // Extract orderId from request params

    // Example order fetching logic (replace with your actual database logic)
    // const order = await Order.findByPk(orderId);

    return res.status(200).json({
      message: `Order ${orderId} details for user ${userId}`,
      // order, // Uncomment and return the order details after implementing
    });
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
  }
};

/**
 * Route to create a new order.
 * Requires authentication.
 */
const createOrderHandler: RequestHandler = async (
  req: CustomAuthRequest,  // Cast request to CustomAuthRequest
  res: Response, 
  next: NextFunction
): Promise<Response> => {
  try {
    // Ensure req.user is defined and is of type UserPayload (email should be a string)
    const user = req.user as UserPayload;  // Type assertion to UserPayload

    if (!user || !user.email) {
      return res.status(401).json({ message: 'Unauthorized: Missing user info' });
    }

    const { id: userId } = user; // Destructure user ID from req.user
    const { productId, quantity } = req.body; // Extract product details from request body

    // Example order creation logic (replace with your database logic)
    // const newOrder = await Order.create({ userId, productId, quantity });

    return res.status(201).json({
      message: 'Order created successfully.',
      // order: newOrder, // Uncomment and return the created order details after implementing
    });
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
  }
};

// Route to fetch order details
router.get('/order/:orderId', authenticateToken, getOrderDetailsHandler);

// Route to create a new order
router.post('/order', authenticateToken, createOrderHandler);

export default router;
