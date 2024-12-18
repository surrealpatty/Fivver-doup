import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Extend the Request interface to guarantee the `user` property
interface CustomAuthRequest extends Request {
  user?: UserPayload;  // `user` will be defined when token is valid
}

export const authenticateToken = (
  req: CustomAuthRequest,  // Use the extended `CustomAuthRequest` interface
  res: Response,
  next: NextFunction
): void => {  // Explicitly return `void` to indicate no direct response
  const authorizationHeader = req.headers['authorization'] as string | undefined;

  if (!authorizationHeader) {
    res.status(401).json({ message: 'Authorization token is missing' }); // Send response in case of error
    return; // Ensure no further code runs
  }

  const token = authorizationHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Authorization token is missing' }); // Send response if token is not provided
    return; // Ensure no further code runs
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;
    req.user = decoded;  // Set the `user` property
    next();  // Continue to next middleware/route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });  // Send response if the token is invalid
  }
};
