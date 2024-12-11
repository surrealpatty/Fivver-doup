// src/routes/orderRoutes.ts
import express, { Response, NextFunction } from 'express';
import authenticateToken from '../middlewares/authenticateToken';
import { AuthRequest, isUser } from '../types';  // Import the type guard
import { createOrder } from '../controllers/orderController';

const router = express.Router();

// Route to create an order
router.post('/', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  if (!isUser(req)) {
    // Handle the case where user is not authenticated
    return res.status(401).json({ error: 'User is not authenticated or missing tier information' });
  }

  try {
    // Now that TypeScript knows req.user is defined, you can safely use it
    const { tier } = req.user;  // Destructure to get tier, you can check additional properties too

    if (!tier) {
      // Handle case where the user doesn't have a tier
      return res.status(401).json({ error: 'User does not have a valid tier' });
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
