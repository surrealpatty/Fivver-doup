import { Request, Response } from 'express';
import { User, Service, Order } from '../models';

// Create an Order
export const createOrder = async (req: Request, res: Response): Promise<Response> => {
  const { userId, serviceId, orderDetails } = req.body;

  try {
    // Fetch the User and Service from the database
    const user = await User.findByPk(userId);
    const service = await Service.findByPk(serviceId);

    if (!user || !service) {
      return res.status(404).json({ message: 'User or Service not found' });
    }

    // Create the order
    const order = await Order.create({
      userId,
      serviceId,
      orderDetails,
      status: 'Pending', // Default status
    });

    return res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error: unknown) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Error creating order', error: (error as Error).message });
  }
};

// Get All Orders
export const getAllOrders = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Fetch all orders from the database
    const orders = await Order.findAll();

    return res.status(200).json(orders);
  } catch (error: unknown) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Error fetching orders', error: (error as Error).message });
  }
};

// Get Order by ID
export const getOrderById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    // Find the order by ID
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json(order);
  } catch (error: unknown) {
    console.error('Error fetching order:', error);
    return res.status(500).json({ message: 'Error fetching order', error: (error as Error).message });
  }
};

// Update Order
export const updateOrder = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { orderDetails, status } = req.body;

  try {
    // Find the order by ID
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order with the new details
    order.orderDetails = orderDetails || order.orderDetails;
    order.status = status || order.status;

    // Save the updated order
    await order.save();

    return res.status(200).json({
      message: 'Order updated successfully',
      order,
    });
  } catch (error: unknown) {
    console.error('Error updating order:', error);
    return res.status(500).json({ message: 'Error updating order', error: (error as Error).message });
  }
};

// Delete Order
export const deleteOrder = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    // Find the order by ID
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Destroy the order
    await order.destroy();

    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting order:', error);
    return res.status(500).json({ message: 'Error deleting order', error: (error as Error).message });
  }
};
