import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';  // Import the verifyToken function from the utils
import { UserPayload } from '../types';  // Import UserPayload type from the appropriate file

// Middleware to authenticate token and attach user data to the request
export const authenticateToken = (
  req: Request & { user?: UserPayload }, // Extending the Request type with the optional user property
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Extract the token from "Bearer <token>"

  if (!token) {
    // If token is missing, send an error response
    return res.status(401).json({ message: 'Access token is missing.' });
  }

  try {
    // Verify the token using the utility function
    const decoded = verifyToken(token);

    // If verification fails, send an error response
    if (!decoded) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    // Attach the decoded user payload to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Catch any unexpected errors during token verification
    console.error('Token verification error:', error);
    return res.status(500).json({ message: 'Token verification failed. Please try again later.' });
  }
};
