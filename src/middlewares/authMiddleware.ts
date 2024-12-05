// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/authMiddleware';  // Correct import for AuthRequest
import { UserPayload } from '../types/authMiddleware';  // Correct import for UserPayload

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Get token from Authorization header (split to remove 'Bearer ')
  const token = req.header('Authorization')?.split(' ')[1];  

  // If no token is found, send a 403 response
  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  // Verify the JWT token
  jwt.verify(token, 'your_secret_key', (err, decoded: any) => {
    if (err) {
      // If token is invalid or expired, send a 403 response
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    // Ensure decoded JWT contains the required properties, including 'tier'
    const userPayload: UserPayload = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      tier: decoded.tier,  // 'tier' should be present in decoded token
    };

    // Add the user payload to the request object, type cast to AuthRequest
    (req as AuthRequest).user = userPayload;

    // Proceed to the next middleware or route handler
    next();
  });
};
