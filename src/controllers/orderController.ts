// src/controllers/orderController.ts
import { Request, Response } from 'express';
import Order from '../models/order'; // Ensure this points to the correct Order model file

// Helper function for validating order input
const validateOrderInput = (userId: string, serviceId: string, quantity: string, totalPrice: string) => {
  if (!userId || !serviceId || !quantity || !totalPrice) {
    return { isValid: false, message: 'Missing required fields: userId, serviceId, quantity, and totalPrice are mandatory.' };
  }

  const parsedUserId = parseInt(userId, 10);
  const parsedServiceId = parseInt(serviceId, 10);
  const parsedQuantity = parseInt(quantity, 10);
  const parsedTotalPrice = parseFloat(totalPrice);

  if (isNaN(parsedUserId) || isNaN(parsedServiceId) || isNaN(parsedQuantity) || isNaN(parsedTotalPrice)) {
    return { isValid: false, message: 'Invalid input: userId, serviceId, quantity, and totalPrice must be numbers.' };
  }

  return { isValid: true };
};

// CREATE: Add a new order
export const createOrder = async (req: Request, res: Response): Promise<Response> => {
  const { userId, serviceId, quantity, totalPrice, orderDetails } = req.body;

  try {
    const validation = validateOrderInput(userId, serviceId, quantity, totalPrice);
    if (!validation.isValid) {
      return res.status(400).json({
        message: validation.message,
        error: 'ValidationError',
      });
    }

    // Convert userId, serviceId, and quantity to integers where necessary
    const parsedUserId = parseInt(userId, 10);
    const parsedServiceId = parseInt(serviceId, 10);
    const parsedQuantity = parseInt(quantity, 10);
    const parsedTotalPrice = parseFloat(totalPrice);

    // Set the default status for the order
    const status: 'Pending' | 'Completed' | 'Cancelled' = 'Pending';  // Default to 'Pending' if not specified

    // Assuming that totalAmount should be the same as totalPrice
    const totalAmount = parsedTotalPrice; // Set totalAmount equal to totalPrice if that's the intention

    // Create the new order using Sequelize's create method
    const order = await Order.create({
      userId: parsedUserId.toString(), // Ensure userId is a string if it's expected as a string in your model
      serviceId: parsedServiceId, // serviceId might remain as number if that's how it's expected in the model
      quantity: parsedQuantity,
      totalPrice: parsedTotalPrice,  // Assuming totalPrice is the same as totalAmount
      totalAmount: totalAmount,  // Add totalAmount here
      orderDetails: orderDetails,   // Include orderDetails from the request body
      status: status,               // Include the default status
    });

    // Respond with the created order
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
