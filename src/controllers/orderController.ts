import { Order } from '../models/order';  // Correct path for the Order model
import { Request, Response } from 'express';
import  { sequelize } from '../config/database';  // Correct path for the sequelize instance
import authenticateToken from '../middlewares/authMiddleware';  // Change to default import


// Interface to type the structure of the request body
interface CreateOrderRequest {
  userId: number;
  serviceId: number;
  orderDetails: string;
  status: string;
}

// Create order controller
export const createOrder = async (req: Request<{}, {}, CreateOrderRequest>, res: Response): Promise<Response> => {
  try {
    const { userId, serviceId, orderDetails, status } = req.body;

    // Use type assertion to match the expected input for Order.create
    const order = await Order.create({
      userId, 
      serviceId, 
      orderDetails, 
      status,
    } as any); // Type assertion as `any`

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating order', error });
  }
};

// Get all orders controller
export const getAllOrders = async (req: Request, res: Response): Promise<Response> => {
  try {
    const orders = await Order.findAll();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// Get order by ID controller
export const getOrderById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching order', error });
  }
};

// Update order controller
export const updateOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const { status } = req.body;
    order.status = status;
    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating order', error });
  }
};

// Delete order controller
export const deleteOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.destroy();
    return res.status(204).json({ message: 'Order deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting order', error });
  }
};

// Function to test the database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();  // Test the connection
    console.log('Database connection successful');
    return true;  // Return true if connection is successful
  } catch (error: unknown) {
    // Type assertion to ensure 'error' is of type 'Error'
    if (error instanceof Error) {
      console.error('Unable to connect to the database:', error.message);
    } else {
      console.error('Unable to connect to the database: Unknown error');
    }
    return false;  // Return false if there is an error
  }
};
