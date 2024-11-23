import { Request, Response } from 'express';
import { sequelize } from '../config/database';  // Corrected import (named import)
import Order from '../models/order';  // Import the initialized Order model

// Basic input validation for creating an order
const validateOrderInput = (userId: string, serviceId: string, quantity: string, totalPrice: string) => {
  const errors: string[] = [];
  
  if (!userId || isNaN(parseInt(userId))) errors.push('Invalid or missing user ID.');
  if (!serviceId || isNaN(parseInt(serviceId))) errors.push('Invalid or missing service ID.');
  if (!quantity || isNaN(parseInt(quantity)) || parseInt(quantity) <= 0) errors.push('Invalid quantity.');
  if (!totalPrice || isNaN(parseFloat(totalPrice)) || parseFloat(totalPrice) <= 0) errors.push('Invalid total price.');

  return {
    isValid: errors.length === 0,
    message: errors.join(' ') || '',
  };
};

/**
 * CREATE: Add a new order
 */
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
      userId: parsedUserId,
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
