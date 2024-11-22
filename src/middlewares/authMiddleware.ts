import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define the expected structure of the decoded JWT payload
interface UserPayload extends JwtPayload {
  id: string;
  email: string;
  username: string;
}

// Augment the Request interface to include the `user` property
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
      return res.status(401).json({ message: 'Authorization token is missing or invalid' });
    }

    // Extract the token after "Bearer"
    const token = authorizationHeader.split(' ')[1];

    // Check if the token is present
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    // Ensure the JWT_SECRET is configured in the environment variables
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not configured in the environment variables');
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, jwtSecret) as UserPayload;

    // Attach the user data from the decoded token to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Token authentication failed:', error);

    // Handle token verification errors (e.g., expired or invalid token)
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
