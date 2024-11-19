import { Request, Response } from 'express';
import Order from '../models/order';

// CREATE: Add a new order
export const createOrder = async (req: Request, res: Response) => {
  const { userId, serviceId, quantity, totalAmount, orderDetails, status = 'pending' } = req.body; // Default status to 'pending'

  // Basic validation to ensure the required fields are present
  if (!userId || !serviceId || !quantity || !totalAmount || !orderDetails) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new order with the status field included
    const order = await Order.create({ userId, serviceId, quantity, totalAmount, orderDetails, status });
    return res.status(201).json(order); // Return the newly created order
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Error creating order', error });
  }
};
