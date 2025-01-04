import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../types'; // Ensure this type defines the expected structure of the JWT payload

// Middleware to check if the user is a paid user
const checkIfPaidUser = (req: Request, res: Response, next: NextFunction) => {
  // Ensure req.user is typed as UserPayload and contains the 'isPaid' property
  const user = req.user as UserPayload;

  // Check if the user exists and has the 'isPaid' property set to true
  if (user && user.isPaid) {
    return next(); // User is paid, continue to the route handler
  }

  // If the user is not paid or not authenticated, return a 403 Forbidden response
  return res.status(403).json({ message: 'Access forbidden for free users.' });
};

export default checkIfPaidUser;
