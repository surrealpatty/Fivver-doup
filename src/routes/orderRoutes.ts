// src/routes/orderRoutes.ts

import express, { Request, Response, RequestHandler } from 'express';
import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/orderController';
// Directly import UserPayload from the correct path
import { UserPayload } from '../types';  // Change from '@types/index' to '../types'

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
  user?: UserPayload;  // Ensure the user property is optionally available
}

// Define the handler types
const createOrderHandler: RequestHandler<{}, {}, CreateOrderRequest> = async (req: OrderRequest, res: Response) => {
  try {
    await createOrder(req, res);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Route to create an order
router.post('/', createOrderHandler);

// Other routes follow the same pattern...

export default router;
