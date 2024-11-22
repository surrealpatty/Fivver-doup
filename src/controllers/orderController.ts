import { Request, Response } from 'express';
import Order from '../models/order';  // Correct the import to use named import

// CREATE: Add a new order
export const createOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, serviceId, quantity, totalPrice } = req.body;

    // Validate required fields
    if (!userId || !serviceId || !quantity || !totalPrice) {
      return res.status(400).json({
        message: 'Missing required fields: userId, serviceId, quantity, and totalPrice are mandatory.',
        error: 'ValidationError',
      });
    }

    // Create the new order
    const order = await Order.create({
      userId,
      serviceId,
      quantity,
      totalPrice,
    });

    // Respond with the created order
    return res.status(201).json({
      message: 'Order created successfully.',
      order,
    });
  } catch (error) {
    console.error('Error creating order:', error);

    // Return an appropriate error response
    return res.status(500).json({
      message: 'Internal server error while creating the order.',
      error: error instanceof Error ? error.message : 'UnknownError',
    });
  }
};

// GET: Get all orders
export const getAllOrders = async (req: Request, res: Response): Promise<Response> => {
  try {
    const orders = await Order.findAll(); // Adjust the query as needed
    return res.status(200).json(orders);  // Return the list of orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({
      message: 'Error fetching orders',
      error: error instanceof Error ? error.message : 'UnknownError',
    });
  }
};

// GET: Get a single order by ID
export const getOrderById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id); // Find the order by its primary key

    if (!order) {
      return res.status(404).json({
        message: `Order with ID ${id} not found.`,
        error: 'NotFoundError',
      });
    }

    return res.status(200).json(order); // Return the order data
  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({
      message: 'Error fetching order',
      error: error instanceof Error ? error.message : 'UnknownError',
    });
  }
};

// PUT: Update an order by ID
export const updateOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { userId, serviceId, quantity, totalPrice } = req.body;

    // Validate required fields
    if (!userId || !serviceId || !quantity || !totalPrice) {
      return res.status(400).json({
        message: 'Missing required fields: userId, serviceId, quantity, and totalPrice are mandatory.',
        error: 'ValidationError',
      });
    }

    // Find the order to update
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({
        message: `Order with ID ${id} not found.`,
        error: 'NotFoundError',
      });
    }

    // Update the order
    await order.update({ userId, serviceId, quantity, totalPrice });

    return res.status(200).json({
      message: 'Order updated successfully.',
      order,
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return res.status(500).json({
      message: 'Internal server error while updating the order.',
      error: error instanceof Error ? error.message : 'UnknownError',
    });
  }
};

// DELETE: Delete an order by ID
export const deleteOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    // Find the order to delete
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({
        message: `Order with ID ${id} not found.`,
        error: 'NotFoundError',
      });
    }

    // Delete the order
    await order.destroy();

    return res.status(200).json({
      message: `Order with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    return res.status(500).json({
      message: 'Internal server error while deleting the order.',
      error: error instanceof Error ? error.message : 'UnknownError',
    });
  }
};
