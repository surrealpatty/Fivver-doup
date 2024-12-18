import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';  // JWT for verifying tokens
import { CustomAuthRequest } from '../types/index';  // Use the correct CustomAuthRequest type
import { UserPayload } from '../types/index'; // Import UserPayload

// Secret key for JWT verification, you should store it in an environment variable for security
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Replace with your actual secret key

// Middleware to check if the user is authenticated
export const checkAuth = (
  req: CustomAuthRequest,  // Use CustomAuthRequest instead of AuthRequest
  res: Response,
  next: NextFunction
): void => {
  // Use req.get() to safely access the authorization header
  const token = req.get('authorization')?.split(' ')[1]; // Assuming token is passed as "Bearer token"

  if (!token) {
    res.status(401).json({ message: 'Authorization token is missing' });
    return; // Ensure function returns when response is sent
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;

    // Handle the case where email is optional and may be undefined
    if (decoded.email === undefined) {
      console.warn('User payload is missing email');
    }

    // Handle the case where username is optional and may be undefined
    if (decoded.username === undefined) {
      console.warn('User payload is missing username');
    }

    // Attach user information to the request object for further use in the route
    req.user = decoded;  // TypeScript will now know req.user is of type CustomAuthRequest

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return; // Ensure function returns when response is sent
  }
};
