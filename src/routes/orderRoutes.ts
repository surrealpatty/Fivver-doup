import express, { Response } from 'express';
import authenticateToken from '../middlewares/authenticateToken';  // Correct path to authenticateToken middleware
import { CustomAuthRequest } from '../types';  // Correct path to CustomAuthRequest type
import { OrderPayload, Order } from '../types/index';  // Correct import for OrderPayload and Order

const router = express.Router();

// Define the order route for creating an order
router.post(
  '/order',
  authenticateToken,  // Ensure user is authenticated with the token
  async (req: CustomAuthRequest, res: Response): Promise<Response> => {
    // Ensure the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id, email = 'No email provided', username, tier } = req.user; // Fallback for email if it's missing

    // Ensure the order payload matches the OrderPayload type
    const { item, quantity, price }: OrderPayload = req.body;

    // Validate order fields
    if (!item || !quantity || !price) {
      return res.status(400).json({ message: 'Missing order data. Ensure item, quantity, and price are provided.' });
    }

    try {
      // Generate a unique orderId (you can replace this with a real ID generator later)
      const orderId = `order-${Date.now()}`;

      // Logic to process the order (e.g., save it to the database)
      const newOrder: Order = {
        orderId,                 // Generate or fetch a unique order ID
        id: 'order-id-placeholder',  // Placeholder ID, you would generate or fetch this
        userId: id,
        item,                    // Correct use of the 'item' field from OrderPayload
        quantity,
        price,
        status: 'pending',       // Default status
        serviceId: 'service-id-placeholder', // Placeholder for service ID
        amount: price * quantity, // Amount = price * quantity
        createdAt: new Date(),   // Timestamp for when the order is created
        updatedAt: new Date(),   // Timestamp for when the order is updated
      };

      // Simulate saving the order (you would interact with the database here)
      // Example: await Order.create(newOrder); (use ORM like Sequelize, Prisma, etc.)

      // Return response with order details
      return res.status(201).json({
        message: 'Order created successfully',
        order: {
          orderId: newOrder.orderId,
          id: newOrder.id,
          email,
          username,
          tier,
          item: newOrder.item,
          quantity: newOrder.quantity,
          price: newOrder.price,
          status: newOrder.status,
          amount: newOrder.amount,
        },  // Return order data in the response
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
