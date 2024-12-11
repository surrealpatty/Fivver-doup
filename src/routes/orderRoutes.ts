// src/routes/orderRoutes.ts
import express, { Response, NextFunction } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { CreateOrderRequest, AuthRequest } from '../types';  // Correct imports for types
import { createOrder } from '../controllers/orderController';

const router = express.Router();

// Route to create an order
router.post('/', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // Ensure that the user is available and has the necessary 'tier' property
    if (!req.user || !req.user.tier) {
      return res.status(401).json({ error: 'User is not authenticated or missing tier information' });
    }

    // Proceed with order creation logic
    await createOrder(req, res);

    // If order creation is successful, send a success response
    return res.status(201).json({ message: 'Order created successfully' });
  } catch (err) {
    // Log the error and send a generic internal server error
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
