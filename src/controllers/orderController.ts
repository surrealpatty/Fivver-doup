// src/controllers/orderController.ts
import { Request, Response } from 'express';
import Order from '../models/order';  // Assuming you have an Order model defined

// Importing RequestHandler type from express
import { RequestHandler } from 'express';

// Function to create a new order
export const createOrder: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { serviceId, status, quantity, totalPrice } = req.body;

  try {
    const newOrder = await Order.create({
      serviceId,
      status,
      quantity,
      totalPrice,
    });
    res.status(201).json(newOrder);  // Sending the response
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Function to get all orders
export const getAllOrders: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);  // Sending the response
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Function to get an order by its ID
export const getOrderById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.status(200).json(order);  // Sending the response
  } catch (error) {
    console.error(`Error fetching order with ID ${id}:`, error);
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Function to update an order
export const updateOrder: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status, quantity, totalPrice } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    order.status = status ?? order.status;
    order.quantity = quantity ?? order.quantity;
    order.totalPrice = totalPrice ?? order.totalPrice;
    await order.save();

    res.status(200).json(order);  // Sending the response
  } catch (error) {
    console.error(`Error updating order with ID ${id}:`, error);
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Function to delete an order
export const deleteOrder: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    await order.destroy();
    res.status(204).json({ message: 'Order deleted successfully' });  // Sending the response
  } catch (error) {
    console.error(`Error deleting order with ID ${id}:`, error);
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
