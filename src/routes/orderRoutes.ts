// src/routes/orderRoutes.ts
import express, { Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';  // Correct import for authenticateToken
import { AuthRequest, isUser } from '../types';  // Correct import for AuthRequest and isUser type guard
import { createOrder } from '../controllers/orderController';

const router = express.Router();

// Route to create an order
router.post('/', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  // Ensure that req.user is defined and is of the correct type
  if (!req.user || !isUser(req.user)) {
    return res.status(400).json({ message: 'User not authenticated or invalid user data' });
  }

  try {
    // Now TypeScript knows req.user is defined as UserPayload
    const { tier } = req.user;  // Safe to access since isUser ensures user is defined

    if (!tier) {
      // Handle case where the user doesn't have a tier
      return res.status(400).json({ error: 'User does not have a valid tier' });
    }

    // Proceed with order creation logic
    await createOrder(req, res);

    // If order creation is successful, send a success response
    return res.status(201).json({ message: 'Order created successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
