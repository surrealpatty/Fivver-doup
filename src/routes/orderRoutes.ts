// src/routes/orderRoutes.ts

import express, { Request, Response, RequestHandler } from 'express';
import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/orderController';
// Correct the import path to point to the correct `types` directory
import { UserPayload } from '../types';  // Import from the correct relative path

const router = express.Router();

// Define the request body type for createOrder
interface CreateOrderRequest {
  userId: number;
  serviceId: number;
  orderDetails: string;
  status: string;
}

// Extend the Request interface to include the user property of type UserPayload
interface OrderRequest extends Request {
  user?: UserPayload;  // Ensure the user property is available and optional
}

// Define the handler types
const createOrderHandler: RequestHandler<{}, {}, CreateOrderRequest> = async (req: OrderRequest, res: Response) => {
  try {
    // Ensure that the user is available and has the necessary 'tier' property
    if (!req.user || !req.user.tier) {
      return res.status(401).json({ error: 'User is not authenticated or missing tier information' });
    }

    // Call createOrder controller with the request and response
    await createOrder(req, res);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Route to create an order
router.post('/', createOrderHandler);

// Other routes can follow the same pattern...

export default router;
