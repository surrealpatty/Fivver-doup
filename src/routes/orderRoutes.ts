// src/routes/orderRoutes.ts

import express, { Response, NextFunction } from 'express';
import authenticateToken from '../middlewares/authenticateToken';  // Correct import for authenticateToken middleware
import { CustomAuthRequest } from '../types';  // Import custom request type for typed access to req.user
import { OrderPayload, Order } from '../types';  // Import Order and OrderPayload types

const router = express.Router();

// Define the order route
router.post(
  '/order',
  authenticateToken,  // Ensure user is authenticated
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Destructure user details from req.user (CustomAuthRequest ensures user is available here)
    const { id, email, username, tier } = req.user;  // Access user properties

    // Ensure the order payload matches the OrderPayload type
    const { item, quantity, price }: OrderPayload = req.body;

    // Check if the necessary fields from the body are provided
    if (!item || !quantity || !price) {
      return res.status(400).json({ message: 'Missing order data' });
    }

    try {
      // Logic to process the order (e.g., save it to the database)
      return res.status(201).json({
        message: 'Order created successfully',
        order: { 
          id, 
          email: email || 'No email provided',  // Handle missing email case
          username, 
          tier, 
          item, 
          quantity, 
          price 
        },  // Return order data
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Route to get orders (example)
router.get('/orders', authenticateToken, async (req: CustomAuthRequest, res: Response) => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const { id, email, username } = req.user;  // Safely destructure user data

  try {
    // Example logic to retrieve orders from the database
    // Here, `orders` should be typed as `Order[]` (an array of Order objects)
    const orders: Order[] = [];  // Replace with actual orders fetching logic

    return res.status(200).json({
      message: 'Orders retrieved successfully',
      orders,  // Return the orders
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
