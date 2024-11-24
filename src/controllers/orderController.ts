import { Request, Response } from 'express';
import { UpdateOrderRequest } from '../types/order';  // Import the UpdateOrderRequest type
import Order from '../models/order';  // Assuming you have an Order model

// Function to update an order
export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, quantity, totalPrice }: UpdateOrderRequest = req.body;  // Use the defined type for the request body

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Apply updates if provided, otherwise retain the current value
    order.status = status ?? order.status;  // Use nullish coalescing to check for null or undefined
    order.quantity = quantity ?? order.quantity;
    order.totalPrice = totalPrice ?? order.totalPrice;

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
