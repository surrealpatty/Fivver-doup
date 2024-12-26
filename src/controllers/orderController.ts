import { Request, Response } from 'express';
import Order from '../models/order';  // Correct import for your Order model

// Example controller functions (replace with actual implementations)

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { serviceId, status, quantity, totalPrice } = req.body;
    const order = await Order.create({ serviceId, status, quantity, totalPrice });
    res.status(201).json(order);
  } catch (error: unknown) {
    // Type-cast error to Error to safely access its message
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error creating order', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred during order creation' });
    }
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error: unknown) {
    // Type-cast error to Error to safely access its message
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred during fetching orders' });
    }
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error: unknown) {
    // Type-cast error to Error to safely access its message
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching order', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred during fetching order' });
    }
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      const { serviceId, status, quantity, totalPrice } = req.body;
      await order.update({ serviceId, status, quantity, totalPrice });
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error: unknown) {
    // Type-cast error to Error to safely access its message
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error updating order', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred during order update' });
    }
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      await order.destroy();
      res.status(200).json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error: unknown) {
    // Type-cast error to Error to safely access its message
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error deleting order', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred during order deletion' });
    }
  }
};
