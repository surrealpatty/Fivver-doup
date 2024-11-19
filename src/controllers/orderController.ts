import { Request, Response } from 'express';
import Order from '../models/order'; // Ensure you have an Order model defined
import { Op } from 'sequelize'; // Sequelize operator for comparison

// CREATE: Add a new order
export const createOrder = async (req: Request, res: Response) => {
  const { userId, serviceId, quantity, totalAmount } = req.body;

  // Basic validation to ensure the required fields are present
  if (!userId || !serviceId || !quantity || !totalAmount) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new order
    const order = await Order.create({ userId, serviceId, quantity, totalAmount });
    return res.status(201).json(order); // Return the newly created order
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Error creating order', error });
  }
};

// READ: Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    // Get all orders
    const orders = await Order.findAll();
    return res.status(200).json(orders); // Return all orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// READ: Get order by ID
export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Find order by ID
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json(order); // Return the found order
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    return res.status(500).json({ message: 'Error fetching order', error });
  }
};

// UPDATE: Update an order by ID
export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity, totalAmount } = req.body;

  // Validate the fields to ensure there's something to update
  if (!quantity && !totalAmount) {
    return res.status(400).json({ message: 'Please provide data to update' });
  }

  try {
    // Find order by ID
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order fields
    if (quantity !== undefined) {
      order.quantity = quantity;
    }
    if (totalAmount !== undefined) {
      order.totalAmount = totalAmount;
    }

    await order.save(); // Save the updated order
    return res.status(200).json(order); // Return the updated order
  } catch (error) {
    console.error('Error updating order:', error);
    return res.status(500).json({ message: 'Error updating order', error });
  }
};

// DELETE: Delete an order by ID
export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Find order by ID
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Delete the order
    await order.destroy();
    return res.status(204).send(); // Send no content status (204)
  } catch (error) {
    console.error('Error deleting order:', error);
    return res.status(500).json({ message: 'Error deleting order', error });
  }
};
