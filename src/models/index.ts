// src/controllers/orderController.ts
import { Request, Response } from 'express';
import { User, Service, Order } from '../models';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, serviceId, orderDetails } = req.body;
    const user = await User.findByPk(userId);
    const service = await Service.findByPk(serviceId);

    if (!user || !service) {
      return res.status(404).json({ message: 'User or Service not found' });
    }

    const order = await Order.create({
      userId,
      serviceId,
      orderDetails,
      status: 'Pending',
    });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { orderDetails, status } = req.body;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderDetails = orderDetails;
    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.destroy();
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};
