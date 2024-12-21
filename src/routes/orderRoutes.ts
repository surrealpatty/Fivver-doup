import { Router, Response, NextFunction } from 'express';
import authenticateToken from '../middlewares/authenticateToken'; 
import { CustomAuthRequest } from 'types';  // Import the CustomAuthRequest type
import { AuthRequest } from 'types/';  // Import the AuthRequest correctly
import { Request } from 'express';
import { UserPayload } from '../types';
const router = Router();

// Define the route for fetching orders
router.get('/orders', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction) => {
  // Ensure the user is defined and has the correct properties
  const user = req.user;
  
  // Add an explicit check for user presence
  if (!user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  // Destructure the user properties only if user is defined
  const { id, email, username, tier } = user;

  try {
    // Simulated orders data (normally you'd fetch this from a database)
    const orders = [
      { orderId: 'order-123', item: 'Service 1', quantity: 2, price: 100, amount: 200, status: 'pending' },
      { orderId: 'order-456', item: 'Service 2', quantity: 1, price: 150, amount: 150, status: 'completed' },
    ];

    return res.status(200).json({
      message: 'Orders fetched successfully',
      user: { id, email, username, tier },  // Return the user data
      orders, // Returning the simulated orders data
    });
  } catch (err: unknown) {
    // Handling potential errors
    if (err instanceof Error) {
      return res.status(500).json({ error: 'Internal server error', details: err.message });
    } else {
      return res.status(500).json({ error: 'Unexpected error' });
    }
  }
});


export default router;
