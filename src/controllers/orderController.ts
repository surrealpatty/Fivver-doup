// src/controllers/orderController.ts
import { Request, Response } from 'express';
import { sequelize } from '../config/database';  // Import the sequelize instance
import OrderModel from '../models/order';  // Import the factory function

// Call the factory function to initialize the model
const Order = OrderModel(sequelize);

// CREATE: Add a new order
export const createOrder = async (req: Request, res: Response): Promise<Response> => {
  const { userId, serviceId, quantity, totalPrice, orderDetails, status = 'Pending' } = req.body;

  try {
    const validation = validateOrderInput(userId, serviceId, quantity, totalPrice);
    if (!validation.isValid) {
      return res.status(400).json({
        message: validation.message,
        error: 'ValidationError',
      });
    }

    // Prepare data
    const parsedUserId = parseInt(userId, 10);
    const parsedServiceId = parseInt(serviceId, 10);
    const parsedQuantity = parseInt(quantity, 10);
    const parsedTotalPrice = parseFloat(totalPrice);
    const totalAmount = parsedTotalPrice;

    // Validate status
    const validStatuses: Array<'Pending' | 'Completed' | 'Cancelled'> = ['Pending', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid order status. Allowed values are Pending, Completed, or Cancelled.',
        error: 'InvalidStatusError',
      });
    }

    // Create the new order
    const order = await Order.create({
      userId: parsedUserId.toString(),
      serviceId: parsedServiceId,
      quantity: parsedQuantity,
      totalPrice: parsedTotalPrice,
      totalAmount: totalAmount,
      orderDetails: orderDetails,
      status: status,
    });

    return res.status(201).json({
      message: 'Order created successfully.',
      order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({
      message: 'Internal server error while creating the order.',
      error: error instanceof Error ? error.message : 'UnknownError',
    });
  }
};
