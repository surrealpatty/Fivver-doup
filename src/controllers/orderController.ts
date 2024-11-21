import { Request, Response } from 'express';
import { Order } from '../models/order';  // Correct the import to use named import

// CREATE: Add a new order
export const createOrder = async (req: Request, res: Response) => {
  // ... your existing code
};

// GET: Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll(); // Adjust the query as needed
    return res.status(200).json(orders);  // Return the list of orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// GET: Get a single order by ID
export const getOrderById = async (req: Request, res: Response) => {
  // ... your existing code
};

// PUT: Update an order by ID
export const updateOrder = async (req: Request, res: Response) => {
  // ... your existing code
};

// DELETE: Delete an order by ID
export const deleteOrder = async (req: Request, res: Response) => {
  // ... your existing code
};
