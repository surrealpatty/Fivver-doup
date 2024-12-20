// src/routes/services.ts

import { Router, Request, Response } from 'express';
import authenticateToken from '../middlewares/authenticateToken'; // Corrected import for named export
import { UserPayload } from '../types'; // Import your custom UserPayload type

const router = Router();

// Define the route with the JWT authentication middleware
router.get('/premium', authenticateToken, (req: Request & { user?: UserPayload }, res: Response) => {
  const user = req.user;

  // Ensure the user exists and has a valid role
  if (!user) {
    return res.status(401).json({ message: 'User not authenticated.' });
  }

  const userRole = user.role;

  // Handle the role logic
  if (userRole === 'Paid') {
    return res.status(200).json({ message: 'Premium service access granted.' });
  } else {
    return res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
  }
});

export default router;
