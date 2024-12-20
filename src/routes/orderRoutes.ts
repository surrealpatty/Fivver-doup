// src/routes/orderRoutes.ts

import express, { Request, Response, NextFunction } from 'express';
import { CustomAuthRequest} from '../types/index'; // Correct import
import authenticateToken from '../middlewares/authenticateToken';  // Corrected import for default export
import { OrderPayload } from '../types/index'; // Manually specify 'index.ts'

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

    const { id, email, username, tier } = req.user;  // Access user properties

    // Check if the necessary fields from the body are provided
    const { item, quantity, price }: OrderPayload = req.body;  // Extract order data

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
