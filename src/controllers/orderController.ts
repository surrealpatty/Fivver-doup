import { Request, Response } from 'express';
import Order from '../models/order'; // Importing the Order model
import { RequestHandler } from 'express';

// Defining the type for the request body in createOrder and updateOrder
interface OrderRequestBody {
  serviceId: number;
  status: string;
  quantity: number;
  totalPrice: number;
}

// Function to create a new order
export const createOrder: RequestHandler = async (
  req: Request<{}, {}, OrderRequestBody>, // Specifying the request body type
  res: Response
): Promise<void> => {
  const { serviceId, status, quantity, totalPrice } = req.body;

  try {
    const newOrder = await Order.create({
      serviceId,
      status,
      quantity,
      totalPrice,
    });
    res.status(201).json(newOrder); // Sending the response
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Function to get all orders
export const getAllOrders: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders); // Sending the response
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Function to get an order by its ID
export const getOrderById: RequestHandler = async (
  req: Request<{ id: string }>, // Specify the param type (id as a string)
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.status(200).json(order); // Sending the response
  } catch (error) {
    console.error(`Error fetching order with ID ${id}:`, error);
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Function to update an order
export const updateOrder: RequestHandler = async (
  req: Request<{ id: string }, {}, OrderRequestBody>, // Specify both param and body types
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { status, quantity, totalPrice } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    // Update only the fields provided, falling back to current values if not provided
    order.status = status ?? order.status;
    order.quantity = quantity ?? order.quantity;
    order.totalPrice = totalPrice ?? order.totalPrice;
    await order.save();

    res.status(200).json(order); // Sending the response
  } catch (error) {
    console.error(`Error updating order with ID ${id}:`, error);
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Function to delete an order
export const deleteOrder: RequestHandler = async (
  req: Request<{ id: string }>, // Specify the param type (id as a string)
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    await order.destroy();
    res.status(204).json({ message: 'Order deleted successfully' }); // Sending the response
  } catch (error) {
    console.error(`Error deleting order with ID ${id}:`, error);
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
