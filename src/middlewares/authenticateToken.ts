// src/middlewares/authenticateToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';  // Import the extended AuthRequest type

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    // Return response but do not return anything from the middleware.
    return res.status(401).send('Access Denied');
  }

  try {
    // Verify token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as UserPayload;  // Set user to the decoded JWT payload

    // Call next middleware or route handler
    return next();  
  } catch (error) {
    // Invalid token response without returning a value
    return res.status(400).send('Invalid Token');
  }
};

export default authenticateToken;
