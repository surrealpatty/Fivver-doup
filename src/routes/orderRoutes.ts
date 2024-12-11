// src/routes/orderRoutes.ts
import express, { Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { AuthRequest, isUser } from '../types';
import { createOrder } from '../controllers/orderController';

const router = express.Router();

// Route to create an order
router.post('/', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  // Ensure that req.user is defined and is of the correct type
  if (!req.user || !isUser(req.user)) {
    return res.status(400).json({ message: 'User not authenticated or invalid user data' });
  }

  try {
    const { tier } = req.user;

    if (!tier) {
      return res.status(400).json({ error: 'User does not have a valid tier' });
    }

    await createOrder(req, res);

    return res.status(201).json({ message: 'Order created successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
