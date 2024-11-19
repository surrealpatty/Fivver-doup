import { Request, Response } from 'express';
import User from '../models/user';
import Service from '../models/service';
import Order from '../models/order';

export const createOrder = async (req: Request, res: Response): Promise<Response> => {
  const { userId, serviceId, orderDetails } = req.body;

  if (!userId || !serviceId || !orderDetails) {
    return res.status(400).json({ message: 'User ID, Service ID, and Order Details are required.' });
  }

  try {
    // Correctly access static methods
    const user = await User.findByPk(userId);
    const service = await Service.findByPk(serviceId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const order = await Order.create({
      userId,
      serviceId,
      orderDetails,
      status: 'Pending',
    });

    return res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error: unknown) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'An error occurred while creating the order.', error: (error as Error).message });
  }
};
