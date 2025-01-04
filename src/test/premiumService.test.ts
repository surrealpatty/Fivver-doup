import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Correct the import path if needed

const router = Router();

// Define the premium service route with authentication
router.get('/premium-service', authenticateToken, (req: Request, res: Response) => {
  // Check if the user is authenticated and has a 'paid' tier
  if (req.user && req.user.tier === 'paid') {
    res.status(200).json({ message: 'Premium service access granted.' });
  } else {
    res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
  }
});

export default router;
