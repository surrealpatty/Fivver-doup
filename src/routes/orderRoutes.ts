// src/routes/orderRoutes.ts

import express, { Response, Request } from 'express';
import authenticateToken from '../middlewares/authenticateToken';  // Correct import for authenticateToken middleware
import { CustomAuthRequest } from '../types';  // Import custom request type for typed access to req.user
import { OrderPayload, Order } from '../types';

const router = express.Router();

// Define the order route for creating an order
router.post(
  '/order',
  authenticateToken,  // Ensure user is authenticated
  async (req: CustomAuthRequest, res: Response): Promise<Response> => {  // Removed `next`, returning `Response` correctly
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Destructure user details from req.user (CustomAuthRequest ensures user is available here)
    const { id, email, username, tier } = req.user;  // Access user properties

    // Ensure the order payload matches the OrderPayload type
    const { item, quantity, price }: OrderPayload = req.body;

    // Check if the necessary fields from the body are provided
    if (!item || !quantity || !price) {
      return res.status(400).json({ message: 'Missing order data. Ensure item, quantity, and price are provided.' });
    }

    try {
      // Logic to process the order (e.g., save it to the database)
      // Simulating order creation logic here
      const newOrder: Order = {
        id: 'order-id-placeholder',  // Placeholder ID, you would generate or fetch this
        userId: id,
        item,
        quantity,
        price,
        status: 'pending',  // Default status, could be updated in real logic
        serviceId: 'service-id-placeholder', // Placeholder for service ID
        amount: price * quantity,  // Amount = price * quantity (you could adjust as needed)
      };

      // Simulate saving the order (you would likely interact with the database here)
      // e.g., await Order.create(newOrder);

      return res.status(201).json({
        message: 'Order created successfully',
        order: {
          id: newOrder.id,
          email: email || 'No email provided',  // Handle missing email case
          username,
          tier,
          item: newOrder.item,
          quantity: newOrder.quantity,
          price: newOrder.price,
          status: newOrder.status,
          amount: newOrder.amount,
        },  // Return order data
      });
    } catch (err: unknown) {
      // Type assertion to Error to handle unknown type
      if (err instanceof Error) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error', details: err.message });
      } else {
        console.error('Unexpected error', err);
        return res.status(500).json({ error: 'Unexpected internal server error' });
      }
    }
  }
);

// Route to get orders (example)
router.get('/orders', authenticateToken, async (req: CustomAuthRequest, res: Response): Promise<Response> => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const { id, email, username } = req.user;  // Safely destructure user data

  try {
    // Example logic to retrieve orders from the database
    // Here, `orders` should be typed as `Order[]` (an array of Order objects)
    const orders: Order[] = [];  // Replace with actual orders fetching logic

    // Simulate fetching orders from a database
    // In a real application, this would be something like:
    // const orders = await Order.findAll({ where: { userId: id } });

    return res.status(200).json({
      message: 'Orders retrieved successfully',
      orders,  // Return the orders
    });
  } catch (err: unknown) {
    // Type assertion to Error to handle unknown type
    if (err instanceof Error) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal server error', details: err.message });
    } else {
      console.error('Unexpected error', err);
      return res.status(500).json({ error: 'Unexpected internal server error' });
    }
  }
});

export default router;
