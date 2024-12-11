// src/routes/orderRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { AuthRequest, isUser } from '../types';  // Correct import for AuthRequest and isUser type guard
import { authenticateToken } from '../middlewares/authenticateToken';  // Correct import for authenticateToken middleware
import { createOrder } from '../controllers/orderController';  // Assuming createOrder function exists in your controllers

const router = Router();

// Route to create an order
router.post(
  '/order',  // Correct route to create order
  authenticateToken,  // Middleware to authenticate user
  async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
    // Check if req.user is defined and is a valid user using the isUser guard
    if (!req.user || !isUser(req.user)) {
      return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }

    try {
      // Safe to access req.user since isUser ensures it's valid
      const { tier } = req.user;

      if (!tier) {
        // Handle case where the user doesn't have a valid tier
        return res.status(400).json({ error: 'User does not have a valid tier' });
      }

      // Proceed with order creation logic using createOrder from controller
      await createOrder(req, res);

      // If order creation is successful, send a success response
      return res.status(201).json({ message: 'Order created successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
