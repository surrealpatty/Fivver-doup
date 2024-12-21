// src/routes/orderRoutes.ts

import { Router, Response, NextFunction } from 'express';
import { CustomAuthRequest } from '../types';  // Import the custom request type
import authenticateToken from '../middlewares/authenticateToken';  // Import the authenticateToken middleware

const router = Router();

// Example: A route that requires a user to be authenticated
router.get('/order/:orderId', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction) => {
  // Ensure that req.user is defined, or else respond with an error
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = req.user;  // `user` is of type `UserPayload | undefined`

  // Access user properties
  const userId = user.id;
  const orderId = req.params.orderId;

  try {
    // Your order fetching logic goes here (for example, fetching from the database)
    // const order = await Order.findByPk(orderId);

    return res.status(200).json({
      message: `Order ${orderId} details for user ${userId}`,
      // order: order,  // Include order details here
    });
  } catch (error) {
    // Error handling
    next(error);
  }
});

// Example of creating an order (ensure user exists)
router.post('/order', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction) => {
  // Ensure req.user is available
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = req.user;  // Access user info
  const { productId, quantity } = req.body;  // Example request body

  try {
    // Logic to create a new order
    // const newOrder = await Order.create({ userId: user.id, productId, quantity });

    return res.status(201).json({
      message: 'Order created successfully.',
      // order: newOrder,  // Return the created order details
    });
  } catch (error) {
    next(error);
  }
});

export default router;
