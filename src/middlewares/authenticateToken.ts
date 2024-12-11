// src/middlewares/authenticateToken.ts
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/authMiddleware';
import { UserPayload } from '../types';  // Ensure UserPayload is correctly imported

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Retrieve the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Access Denied: No token provided' });
    return;
  }

  try {
    // Decode the token using JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { id: string, tier: 'free' | 'paid' };

    // Attach the user information to req.user, ensuring 'tier' is included
    req.user = {
      id: decoded.id,
      email: '', // Optional: Retrieve email from your data if needed
      username: '', // Optional: Retrieve username if needed
      tier: decoded.tier,  // Ensure `tier` is populated from the decoded token
      role: '', // Optional: Retrieve role if needed
    };

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Access Denied: Invalid token' });
  }
};
