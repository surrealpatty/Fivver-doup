// src/middlewares/authenticateToken.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types'; // Ensure correct import

// Middleware to authenticate token and attach user data to the request
export const authenticateToken = (
  req: Request & { user?: UserPayload }, // Extending the Request type with the optional user property
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Extract the token from the "Authorization" header

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || 'your-secret-key'
    ) as UserPayload;

    // Attach the decoded user payload to the request
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};
