// src/middlewares/authMiddleware.ts

import { Response, NextFunction } from 'express';
import { CustomAuthRequest } from '../types'; // Import the correct type for CustomAuthRequest

/**
 * Middleware to ensure the user is authenticated.
 * Checks if the user property exists on the request object, which is set by the authenticateToken middleware.
 */
export const authenticateUser = (
  req: CustomAuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    // If the user is not authenticated, respond with a 401 status
    res.status(401).json({ error: 'Unauthorized' });
    return; // Ensure the function returns early
  }

  // If the user is authenticated, proceed to the next middleware or route handler
  next();
};
