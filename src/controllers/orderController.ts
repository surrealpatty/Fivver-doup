// src/controllers/orderController.ts
import { Request, Response } from 'express';
import User from '../models/user';
import Service from '../models/service'; // Correct path to Service model
import Order from '../models/order';

export const createOrder = async (req: Request, res: Response): Promise<Response> => {
  const { userId, serviceId, orderDetails } = req.body;

  // Validate input data
  if (!userId || !serviceId || !orderDetails) {
    return res.status(400).json({ 
      message: 'User ID, Service ID, and Order Details are required.' 
    });
  }

  try {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found.' 
      });
    }

    // Check if the service exists
    const service = await Service.findByPk(serviceId); // Correct usage of findByPk
    if (!service) {
      return res.status(404).json({ 
        message: 'Service not found.' 
      });
    }

    // Create the order
    const order = await Order.create({
      userId,
      serviceId,
      orderDetails,
      status: 'Pending', // Default status
    });

    // Respond with success
    return res.status(201).json({
      message: 'Order created successfully.',
      order,
    });
  } catch (error: unknown) {
    console.error('Error creating order:', error);

    // Return detailed error message in development
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? (error as Error).message 
      : 'An error occurred.';

    return res.status(500).json({ 
      message: 'An error occurred while creating the order.', 
      error: errorMessage,
    });
  }
};
