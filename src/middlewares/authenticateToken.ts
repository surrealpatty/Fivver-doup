import { NextFunction, Response } from 'express';
import { CustomAuthRequest } from '../types/customRequest'; // Correctly import the CustomAuthRequest type
import { UserPayload } from '../types'; // Ensure UserPayload is correctly imported
import jwt from 'jsonwebtoken';

// Middleware to authenticate and verify the token
export const authenticateToken = (
  req: CustomAuthRequest, // Correctly typed request with optional `user`
  res: Response,
  next: NextFunction
): void => {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Extract the token after "Bearer"

  // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    res.status(401).json({ message: 'Access token is missing' });
    return;  // Explicitly return after sending a response
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as UserPayload;

    // Ensure the decoded payload contains required fields
    if (!decoded || !decoded.id || !decoded.email) {
      res.status(400).json({ message: 'Invalid token: Missing required fields' });
      return; // Explicitly return after sending a response
    }

    // Attach the decoded user payload to the request object
    req.user = decoded; // Attach the decoded payload as `user`

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid or expired token
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
