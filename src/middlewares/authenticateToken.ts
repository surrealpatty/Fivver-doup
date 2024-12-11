// src/middlewares/authenticateToken.ts
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';  // Ensure AuthRequest is correctly imported
import { UserPayload } from '../types';  // Ensure UserPayload is correctly imported

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Retrieve the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    // Send response and exit the middleware
    res.status(401).json({ message: 'Access Denied: No token provided' });
    return;
  }

  try {
    // Decode the token using JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as UserPayload;

    // Attach the decoded user information to req.user, ensuring 'tier' is included
    req.user = {
      id: decoded.id,
      email: decoded.email || '',
      username: decoded.username || '',
      tier: decoded.tier,  // Ensure `tier` is populated from the decoded token
      role: decoded.role || '',  // Optional: You can include role if required
    };

    // Proceed to the next middleware or route handler
    next();  
  } catch (err) {
    // Handle invalid token case and send a response
    res.status(401).json({ message: 'Access Denied: Invalid token' });
  }
};
