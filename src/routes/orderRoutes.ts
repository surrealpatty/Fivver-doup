// src/routes/orderRoutes.ts

import { Router, Response, NextFunction } from 'express';
import { CustomAuthRequest } from '../types';  // Correct import for CustomAuthRequest
import authenticateToken from '../middlewares/authenticateToken'; // Correct import for authenticateToken middleware

const router = Router();

// Example route to fetch orders
router.get('/orders', authenticateToken, async (req: CustomAuthRequest, res: Response) => {
  // Access the user from the request
  const user = req.user;

  // Ensure that user is defined before proceeding
  if (!user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  // Destructure the properties from the user object
  const { id, email, username, tier } = user;

  try {
    // Simulated orders data (normally you'd fetch this from a database)
    const orders = [
      { orderId: 'order-123', item: 'Service 1', quantity: 2, price: 100, amount: 200, status: 'pending' },
      { orderId: 'order-456', item: 'Service 2', quantity: 1, price: 150, amount: 150, status: 'completed' },
    ];

    return res.status(200).json({
      message: 'Orders fetched successfully',
      user: { id, email, username, tier },
      orders, // Returning the simulated orders data
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: 'Internal server error', details: err.message });
    } else {
      return res.status(500).json({ error: 'Unexpected error' });
    }
  }
});

export default router;
