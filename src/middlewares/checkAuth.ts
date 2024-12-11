import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';  // JWT for verifying tokens
import { AuthRequest } from '../types/index'; // Import the correct path for AuthRequest
import { UserPayload } from '../types/index'; // Import the correct path for UserPayload

// Secret key for JWT verification, you should store it in an environment variable for security
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Replace with your actual secret key

// Middleware to check if the user is authenticated
export const checkAuth = (
  req: AuthRequest,  // Use AuthRequest instead of Request
  res: Response,
  next: NextFunction
): void => {
  // Get the authorization header
  const authHeader = req.get('authorization');

  // Ensure the authorization header is a string before calling split()
  if (typeof authHeader !== 'string') {
    res.status(401).json({ message: 'Authorization token is missing or invalid' });
    return;  // Explicitly return to avoid further execution
  }

  // Extract the token from the authorization header (e.g., "Bearer token")
  const token = authHeader.split(' ')[1]; // Now safe to call split on a string

  if (!token) {
    res.status(401).json({ message: 'Authorization token is missing' });
    return;  // Explicitly return to avoid further execution
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;

    // Handle the case where email is optional and may be undefined
    if (decoded.email === undefined) {
      console.warn('User payload is missing email');
    }

    // Attach user information to the request object for further use in the route
    req.user = decoded;  // TypeScript will now know req.user is of type AuthRequest

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid token case and return response directly
    res.status(401).json({ message: 'Invalid or expired token' });
    return;  // Explicitly return to avoid further execution
  }
};
