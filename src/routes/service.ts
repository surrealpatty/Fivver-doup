// src/routes/services.ts

import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Corrected import for named export
import { UserPayload } from '../types'; // Import your custom UserPayload type

const router = Router();

// Define the route with the JWT authentication middleware
router.get('/premium', authenticateToken, (req: Request & { user?: UserPayload }, res: Response) => {
  const userRole = req.user?.role;

  if (userRole === 'Paid') {
    return res.status(200).json({ message: 'Premium service access granted.' });
  } else {
    return res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
  }
});

export default router;
