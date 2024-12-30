// src/middlewares/authenticateToken.ts
import { NextFunction, Response } from 'express';
import { CustomAuthRequest } from '../types/customRequest'; // Correctly import the CustomAuthRequest type
import { UserPayload } from '../types'; // Ensure UserPayload is correctly imported
import jwt from 'jsonwebtoken';

// Middleware to authenticate and verify the token
export const authenticateToken = (
  req: CustomAuthRequest,  // Correctly typed request with non-optional `user`
  res: Response,
  next: NextFunction
): void => {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];  // Extract the token after "Bearer"

  // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    res.status(401).json({ message: 'Access token is missing' });
    return;  // No need to return anything after sending a response
  }

  try {
    // Ensure JWT_SECRET is set
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ message: 'JWT_SECRET is not defined' });
      return;  // No need to return anything after sending a response
    }

    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, jwtSecret) as UserPayload;

    // Ensure the decoded payload contains required fields
    if (!decoded || !decoded.id || !decoded.email || !decoded.username) {
      res.status(400).json({ message: 'Invalid token: Missing required fields' });
      return;  // No need to return anything after sending a response
    }

    // Attach the decoded user payload to the request object
    req.user = {
      id: decoded.id,
      email: decoded.email, // Ensure email is always provided
      username: decoded.username, // Ensure username is always provided
    };

    // Proceed to the next middleware or route handler
    next(); // No need to return anything after calling next
  } catch (error) {
    // Handle invalid or expired token
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
