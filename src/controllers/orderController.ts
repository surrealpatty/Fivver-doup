import { Request, Response } from 'express';
import Order from '../models/order';  // Assuming you have an Order model

// Function to create an order
export const createOrder = async (req: Request, res: Response) => {
  // Order creation logic...
};

// Function to get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll();  // Assuming Sequelize ORM
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({
      message: 'Error fetching orders.',
      error: error instanceof Error ? error.message : 'UnknownError',
    });
  }
};

// Function to get an order by ID
export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ order });
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({
      message: 'Error fetching order.',
      error: error instanceof Error ? error.message : 'UnknownError',
    });
  }
};

// Function to update an order
export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, quantity, totalPrice } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status || order.status;
    order.quantity = quantity || order.quantity;
    order.totalPrice = totalPrice || order.totalPrice;

    await order.save();
    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({
      message: 'Error updating order.',
      error: error instanceof Error ? error.message : 'UnknownError',
    });
  }
};

// Function to delete an order
export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.destroy();
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({
      message: 'Error deleting order.',
      error: error instanceof Error ? error.message : 'UnknownError',
    });
  }
};
