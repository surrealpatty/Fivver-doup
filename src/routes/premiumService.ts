// src/routes/premiumService.ts

import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Correct import path
import { UserPayload } from '../types'; // Correct the path if necessary

const router = Router();

// Define the premium service route with authentication
router.get('/premium-service', authenticateToken, (req: Request & { user?: UserPayload }, res: Response) => {
  // Check if the user is authenticated and has a 'paid' tier
  if (req.user && req.user.tier === 'paid') {
    res.status(200).json({ message: 'Premium service access granted.' });
  } else {
    res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
  }
});

export default router;
