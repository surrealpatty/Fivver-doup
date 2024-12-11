import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, UserPayload } from '../types';  // Import the AuthRequest and UserPayload types

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    // Send the 401 response and exit early without returning anything from the middleware
    res.status(401).send('Access Denied');
    return;  // Prevent further code execution
  }

  try {
    // Verify token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as UserPayload;  // Set user to the decoded JWT payload

    // Proceed to the next middleware or route handler
    next();  
  } catch (error) {
    // Invalid token response without returning a value
    res.status(400).send('Invalid Token');
    return;  // Prevent further code execution
  }
};

export default authenticateToken;
