import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define the expected structure of the decoded JWT payload
interface UserPayload extends JwtPayload {
  id: string;
  email: string;
  username: string;
  tier: 'free' | 'paid'; // If the 'tier' is part of your UserPayload
}

// Augment the Request interface to include the `user` property
declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload; // Ensure this is consistent across your files
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
      return; // Return here to stop further processing
    }

    const token = authorizationHeader.split(' ')[1]; // Extract the token after "Bearer"

    // Check if the token is present
    if (!token) {
      res.status(401).json({ message: 'Authorization token is missing' });
      return; // Return here to stop further processing
    }

    const jwtSecret = process.env.JWT_SECRET;

    // Ensure the JWT_SECRET is configured in the environment variables
    if (!jwtSecret) {
      console.error('JWT_SECRET is not configured in the environment variables');
      res.status(500).json({ message: 'Internal server error' });
      return; // Return here to stop further processing
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
