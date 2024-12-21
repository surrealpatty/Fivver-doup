import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';  // Importing jwt
import { CustomAuthRequest } from '../types';  // Correct import for CustomAuthRequest
import { UserPayload } from '../types';  // Import UserPayload type

// Middleware to authenticate and decode JWT token
const authenticateToken = async (
  req: CustomAuthRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  // Extract the token from the Authorization header (Bearer token)
  const token = req.headers['authorization']?.split(' ')[1];  // "Bearer <token>"

  // If no token is provided, return a 401 Unauthorized error
  if (!token) {
    res.status(401).json({ message: 'Token missing' });
    return; // Stop further processing
  }

  try {
    // Verify the token using JWT secret key
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY as string) as UserPayload;

    // Attach the decoded user data to the request object (req.user)
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();  // Pass control to the next middleware or handler if token is valid
  } catch (err) {
    // If token is invalid or expired, return a 403 Forbidden error
    res.status(403).json({ message: 'Token is not valid' });
  }
};

export default authenticateToken;
