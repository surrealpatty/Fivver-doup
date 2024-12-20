import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';  // JWT for verifying tokens
import { UserPayload } from '../types/index'; // Import UserPayload

// Extend the Express Request type to include the user property
interface CustomAuthRequest extends Request {
  user?: UserPayload;  // Add the user payload to the request
}

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

    req.user = decoded as CustomAuthRequest['user']; // Use the correct type assertion

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return; // Ensure function returns when response is sent
  }
};
