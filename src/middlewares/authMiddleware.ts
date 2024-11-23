import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../types'; // Ensure the correct path to UserPayload is imported

// Extend the Request interface to include the user object, which may be undefined
interface AuthRequest extends Request {
  user?: UserPayload; // user is optional, can be undefined
}

/**
 * Middleware to check if the user is authenticated by verifying req.user.
 * @param req - Request object, may include a user object if authenticated.
 * @param res - Response object to send the result.
 * @param next - Next function to pass control to the next middleware or route handler.
 * @returns Either sends a 401 error if not authenticated or passes control to the next handler.
 */
export const checkAuth = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
  // Ensure user is present on the request object (authenticated)
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  next();
};
