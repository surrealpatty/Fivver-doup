// src/routes/orderRoutes.ts
import express, { Response } from 'express';
import { createOrder } from '../controllers/orderController';
import { CreateOrderRequest } from '../types';
import { AuthRequest } from '../types';  // Correct import of AuthRequest type

const router = express.Router();

// Define the handler types
const createOrderHandler = async (req: AuthRequest, res: Response): Promise<Response> => {
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
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Route to create an order
router.post('/', createOrderHandler);

export default router;
