import express, { Request, Response } from 'express'; // Correct import for express
import { authenticateToken } from '../middlewares/authenticateToken';
import { UserPayload } from '../types'; // Ensure the correct path to the type

const router = express.Router();

// Define the premium service route with authentication
router.get('/premium-service', authenticateToken, (req: Request & { user?: UserPayload }, res: Response) => {
  // Check if the user object exists and if the user has a 'paid' tier
  if (req.user?.tier === 'paid') {
    // If the user is paid, grant access
    res.status(200).json({ message: 'Premium service access granted.' });
  } else if (req.user) {
    // If the user is logged in but not a paid user
    res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
  } else {
    // If the user is not logged in
    res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }
});

export default router;
