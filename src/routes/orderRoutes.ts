import { Router, Request, Response } from 'express';
import { CustomAuthRequest } from '../types'; // Correct import for CustomAuthRequest
import { authenticateToken } from '../middlewares/authenticateToken'; // Correct import for the authentication middleware

const router = Router();

// Example route to fetch orders
router.get('/orders', authenticateToken, async (req: CustomAuthRequest, res: Response): Promise<Response> => {
  // Ensure req.user is always defined because it's now non-optional in CustomAuthRequest
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  // You can now safely access user properties
  const { id, email, username, tier } = user;

  try {
    // Simulate fetching orders from a database (you would normally interact with your DB here)
    // Example: const orders = await Order.findAll({ where: { userId: id } });

    const orders = [
      // Simulated orders data
      {
        orderId: 'order-123',
        item: 'Service 1',
        quantity: 2,
        price: 100,
        amount: 200,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 'order-456',
        item: 'Service 2',
        quantity: 1,
        price: 150,
        amount: 150,
        status: 'completed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Return orders for the authenticated user
    return res.status(200).json({
      message: 'Orders fetched successfully',
      user: {
        id,
        email,
        username,
        tier,
      },
      orders, // Returning the simulated orders data
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
});

// Additional routes for order management can be added here

export default router;
