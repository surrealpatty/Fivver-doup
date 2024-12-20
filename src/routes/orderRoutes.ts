// src/routes/orderRoutes.ts

import express, { Response, NextFunction } from 'express';
import  authenticateToken  from '../middlewares/authenticateToken'; // Correct import for default export
import { CustomAuthRequest } from '../types';  // Correct import for the custom request type
import { OrderPayload } from '../types';  // Assuming OrderPayload is defined in your types

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

    // Destructure user details from req.user (CustomAuthRequest is ensuring user is always available here)
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

export default router;
