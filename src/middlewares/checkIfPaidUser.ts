import { Request, Response, NextFunction } from 'express';

const checkIfPaidUser = (req: Request, res: Response, next: NextFunction) => {
  // Ensure req.user is populated with user data (usually done by authentication middleware)
  if (req.user && req.user.isPaid) {
    return next(); // User is paid, continue to the route handler
  }
  
  // If user is not paid or not authenticated, return a 403 Forbidden response
  return res.status(403).json({ message: 'Access forbidden for free users.' });
};

export default checkIfPaidUser;
