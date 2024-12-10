// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../types'; // Import the correct type

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Check for authorization header
  const token = req.headers['authorization']?.split(' ')[1]; // Example token parsing

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided.' });
  }

  // Here you should add actual token validation logic, e.g., JWT verification
  // For now, let's mock the user payload as an example
  const user: UserPayload = {
    id: 'userId',
    email: 'user@example.com',
    username: 'user123',
    role: 'user',  // Add role as necessary
    tier: 'free',
  };

  // Attach the user payload to the request object
  req.user = user;

  next(); // Call next middleware
};
