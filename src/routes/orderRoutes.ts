// src/routes/orderRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { CustomAuthRequest } from '../types';  // Import the correct type for the request
import { createOrder } from '../controllers/orderController';  // Import the controller function
import { authenticateToken } from '../middlewares/authenticateToken';  // Import the authentication middleware

const router = Router();

// POST route for creating an order
router.post(
  '/',
  authenticateToken,  // Use the authentication middleware
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    // Ensure user is authenticated (check if req.user exists)
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Proceed with the order creation logic if user is authenticated
    try {
      const { serviceId, orderDetails, status } = req.body; // Destructure necessary fields from the body

      // Ensure that req.user contains all required fields for UserPayload
      const { id: userId, email, username, tier, role } = req.user;
      
      // Pass the userId along with other details to create the order
      const order = await createOrder({
        userId, 
        serviceId, 
        orderDetails, 
        status
      });

      // Return the created order with a 201 status
      return res.status(201).json(order);
    } catch (error) {
      next(error);  // Pass error to the next middleware (error handler)
    }
  }
);

export default router;
