import { NextFunction, Response } from 'express';
import { CustomAuthRequest } from '../types'; // Import CustomAuthRequest
import jwt from 'jsonwebtoken'; // Import jsonwebtoken

// Middleware to authenticate and verify the token
export const authenticateToken = (
  req: CustomAuthRequest, // Use CustomAuthRequest to correctly type 'req'
  res: Response,
  next: NextFunction
): void => {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Extract token after "Bearer"

  // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    res.status(401).json({ message: 'Access token is missing' });
    return;
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as {
      id: string;
      email: string;
      username?: string;
      tier?: string;
    }; // Type the decoded payload

    // Check if the required fields are present in the decoded payload
    if (!decoded || !decoded.id || !decoded.email) {
      res.status(400).json({ message: 'Invalid token: Missing required fields' });
      return;
    }

    // Attach the decoded user payload to the request object
    req.user = decoded; // req.user is now of type UserPayload

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid or expired token
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
};
