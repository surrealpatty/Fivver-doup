// src/routes/orderRoutes.ts
import express, { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { isUserPayload } from '../types';  // Assuming isUserPayload is correctly imported
import { createOrder } from '../controllers/orderController';  // Ensure createOrder is correctly imported
import { AuthRequest, CreateOrderRequest } from '../types';  // Ensure correct imports

const router = express.Router();

// Define the handler for creating an order
const createOrderHandler = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (isUserPayload(req.user)) {  // Use the type guard to ensure user is valid
    try {
      // Proceed with order creation logic, passing the correct request body
      const orderData: CreateOrderRequest = {
        userId: req.user.id,   // Assuming req.user contains `id` and `tier`
        serviceId: req.body.serviceId,
        orderDetails: req.body.orderDetails,
        status: 'pending', // Set default status or customize as needed
      };
      
      await createOrder(orderData, res);  // Pass orderData to createOrder
    } catch (err) {
      next(err);  // Pass errors to the next middleware
    }
  } else {
    res.status(400).json({ message: 'Invalid user data or missing tier information' });
  }
};

// Route to create an order
router.post('/', authenticateToken, createOrderHandler);

// Example for a getAllOrders route:
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  if (isUserPayload(req.user)) {  // Ensure user is valid before proceeding
    try {
      // Your logic to fetch all orders
      res.status(200).json({ message: 'Fetched orders successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(400).json({ message: 'Invalid user data or missing tier information' });
  }
});

export default router;
