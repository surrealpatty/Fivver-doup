import express, { Response, NextFunction } from 'express';
import authenticateToken from '../middlewares/authenticateToken';  // Correct path to authenticateToken middleware
import { CustomAuthRequest } from '../types';  // Correct path to CustomAuthRequest type
import { OrderPayload, Order } from '../types/index';  // Correct import for OrderPayload and Order

const router = express.Router();

// Define the order route for creating an order
router.post(
  '/order',
  authenticateToken,  // Ensure user is authenticated with the token
  async (req: CustomAuthRequest, res: Response): Promise<Response> => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id, email, username, tier } = req.user;

    // Ensure the order payload matches the OrderPayload type
    const { item, quantity, price }: OrderPayload = req.body;

    // Check if the necessary fields from the body are provided
    if (!item || !quantity || !price) {
      return res.status(400).json({ message: 'Missing order data. Ensure item, quantity, and price are provided.' });
    }

    try {
      // Logic to process the order (e.g., save it to the database)
      const newOrder: Order = {
        id: 'order-id-placeholder',  // Placeholder ID, you would generate or fetch this
        userId: id,
        item,                      // Correct use of the 'item' field
        quantity,
        price,
        status: 'pending',         // Default status
        serviceId: 'service-id-placeholder', // Placeholder for service ID
        amount: price * quantity,  // Amount = price * quantity
        createdAt: new Date(),     // Placeholder for createdAt
        updatedAt: new Date(),     // Placeholder for updatedAt
      };

      // Simulate saving the order (you would likely interact with the database here)
      // Example: await Order.create(newOrder);

      return res.status(201).json({
        message: 'Order created successfully',
        order: {
          id: newOrder.id,
          email: email || 'No email provided',
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

export default router;
