import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define the expected structure of the decoded JWT payload
interface UserPayload extends JwtPayload {
  id: string;
  email: string;
  username: string;
}

// Extend the Request interface to include the `user` property
declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload;
  }
}

// Middleware to authenticate the token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Extract the token from the Authorization header
    const authorizationHeader = req.headers['authorization'];

    // Check if the header exists and starts with "Bearer"
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Authorization token is missing or invalid' });
      return; // Stop further processing
    }

    const token = authorizationHeader.split(' ')[1]; // Extract the token after "Bearer"

    // Check if the token is present
    if (!token) {
      res.status(401).json({ message: 'Authorization token is missing' });
      return; // Stop further processing
    }

    const jwtSecret = process.env.JWT_SECRET;

    // Ensure the JWT_SECRET is configured in the environment variables
    if (!jwtSecret) {
      console.error('JWT_SECRET is not configured in the environment variables');
      res.status(500).json({ message: 'Internal server error' });
      return; // Stop further processing
    }

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, jwtSecret) as UserPayload;

    // Attach the user data from the decoded token to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Token authentication failed:', error);

    // Handle token verification errors
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check if the user is authenticated
export const checkAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Check if `user` exists on the request object (i.e., token has been authenticated)
  if (!req.user) {
    res.status(401).json({ message: 'User is not authenticated' });
    return; // Stop further processing
  }

  // User is authenticated, proceed to the next middleware or route handler
  next();
};
