import { AuthRequest } from '../types/authMiddleware';  // Import the AuthRequest interface
import { Response, NextFunction } from 'express';

// Example middleware to check if user is authenticated
export const getUserProfile = (req: AuthRequest, res: Response, next: NextFunction) => {
  const user = req.user;  // `req.user` is of type `UserPayload`
  
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized, no user found' });
  }

  // Safe to access user properties like user.id, user.email
  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    tier: user.tier,
  });
};
