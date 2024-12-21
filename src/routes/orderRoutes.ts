import { Router, Response, NextFunction } from 'express';
import authenticateToken from '../middlewares/authenticateToken'; 
import { CustomAuthRequest } from '../types';  // Import CustomAuthRequest
import { UserPayload } from '../types';  // Import UserPayload

const router = Router();

// Define the route for fetching orders
router.get('/orders', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction) => {
  // Ensure the user is defined
  const user = req.user;

  // If no user is authenticated, return 401
  if (!user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  // Destructure the user properties only if user is defined and ensure TypeScript understands user is a UserPayload
  const { id, email, username, tier } = user as UserPayload;  // Type cast to UserPayload

  try {
    // Simulated orders data (replace with actual database logic)
    const orders = [
      { orderId: 'order-123', item: 'Service 1', quantity: 2, price: 100, amount: 200, status: 'pending' },
      { orderId: 'order-456', item: 'Service 2', quantity: 1, price: 150, amount: 150, status: 'completed' },
    ];

    return res.status(200).json({
      message: 'Orders fetched successfully',
      user: { id, email, username, tier },  // Return the user data
      orders,  // Returning the simulated orders data
    });
  } catch (err: unknown) {
    // Handle any unexpected errors
    if (err instanceof Error) {
      return res.status(500).json({ error: 'Internal server error', details: err.message });
    } else {
      return res.status(500).json({ error: 'Unexpected error' });
    }
  }
});

export default router;
