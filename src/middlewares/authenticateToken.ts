// src/middlewares/authenticateToken.ts
import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { CustomAuthRequest } from '../types/auth';  // Import CustomAuthRequest
import { UserPayload } from '../types';  // Import UserPayload from a consistent location

// Middleware to authenticate token
const authenticateToken = (req: CustomAuthRequest, res: Response, next: NextFunction): void => {
  // Extract token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is found, return 401 Unauthorized response
  if (!token) {
    next(new Error('Access denied'));
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    if (err) {
      // If the token is invalid, return 403 Forbidden response
      return res.status(403).send('Invalid token');
    }

    // Ensure that `decoded` is cast to the correct `UserPayload` type
    req.user = decoded as UserPayload;  // Type assertion

    // Proceed to the next middleware or route handler
    next();
  });
};

export { authenticateToken };
