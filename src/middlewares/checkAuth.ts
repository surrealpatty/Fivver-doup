import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';  // JWT for verifying tokens
import { UserPayload } from 'src/types/index';  // Correct import for UserPayload

// Secret key for JWT verification, you should store it in an environment variable for security
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Replace with your actual secret key

// Middleware to check if the user is authenticated
export const checkAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is passed as "Bearer token"

  if (!token) {
    res.status(401).json({ message: 'Authorization token is missing' });
    return; // Ensure function returns when response is sent
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;

    // Attach user information to the request object for further use in the route
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return; // Ensure function returns when response is sent
  }
};
