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
    user?: UserPayload;  // User information will be attached to the request object
  }
}

// Middleware to authenticate the token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {
  try {
    // Extract the token from the Authorization header
    const authorizationHeader = req.headers['authorization'] as string | undefined;

    // Check if the header exists and starts with "Bearer"
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token is missing or invalid' });
    }

    // Extract the token after "Bearer"
    const token = authorizationHeader.split(' ')[1];

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

    // Handle different types of errors more specifically
    if (error instanceof jwt.JsonWebTokenError) {
      // If the token is invalid or malformed
      return res.status(403).json({ message: 'Invalid token' });
    } else if (error instanceof jwt.TokenExpiredError) {
      // If the token has expired
      return res.status(401).json({ message: 'Token has expired' });
    } else {
      // Catch any other errors
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

// Middleware to check if the user is authenticated
export const checkAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {
  // Check if `user` exists on the request object (i.e., token has been authenticated)
  if (!req.user) {
    return res.status(401).json({ message: 'User is not authenticated' });
  }

  // User is authenticated, proceed to the next middleware or route handler
  next();
};
