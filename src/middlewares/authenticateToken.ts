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

  // Verify the token using the utility function
  const decoded = verifyToken(token);

  if (!decoded) {
    // If token verification fails, send an error response
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }

  // Attach the decoded user payload to the request object
  req.user = decoded;

  // Proceed to the next middleware or route handler
  next();
};
