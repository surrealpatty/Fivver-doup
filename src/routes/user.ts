// src/routes/user.ts

import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from './middlewares/authenticateToken'; // Correct named import
import { CustomAuthRequest } from '../types';  // Correct import for CustomAuthRequest type

const router = Router();

// Define a route for premium access
router.get('/premium', authenticateToken, (req: CustomAuthRequest, res: Response) => {
  // Ensure req.user is not undefined
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = req.user;  // req.user is of type UserPayload

  // Check if the user role exists
  const userRole = user.role;  // Optional chaining ensures that role can be undefined
  if (!userRole) {
    return res.status(403).json({ message: 'User role not found.' });
  }

  // Handle premium access logic based on role
  if (userRole === 'paid') {
    return res.status(200).json({ message: 'Premium access granted.' });
  } else {
    return res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
  }
});

export default router;
