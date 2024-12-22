// src/routes/orderRoutes.ts

import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Corrected import
import { CustomAuthRequest } from '../types'; // Correct path to the CustomAuthRequest type

const router = Router();

/**
 * Route to fetch order details.
 * Requires authentication.
 */
router.get(
  '/order/:orderId',
  authenticateToken,  // Ensure token is authenticated
  async (req: CustomAuthRequest, res: Response, next: NextFunction) => {
    try {
      // Ensure req.user is defined (since it comes from authenticateToken)
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { id: userId } = req.user; // Destructure user ID from req.user
      const { orderId } = req.params; // Extract orderId from request params

      // Example order fetching logic (replace with your database logic)
      // const order = await Order.findByPk(orderId);

      return res.status(200).json({
        message: `Order ${orderId} details for user ${userId}`,
        // order, // Uncomment and return the order details after implementing
      });
    } catch (error) {
      next(error); // Pass errors to the error-handling middleware
    }
  }
);

/**
 * Route to create a new order.
 * Requires authentication.
 */
router.post(
  '/order',
  authenticateToken,  // Ensure token is authenticated
  async (req: CustomAuthRequest, res: Response, next: NextFunction) => {
    try {
      // Ensure req.user is defined (since it comes from authenticateToken)
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { id: userId } = req.user; // Destructure user ID from req.user
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
  }
);

export default router;
