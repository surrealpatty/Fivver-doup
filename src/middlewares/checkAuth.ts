import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';  // Import jwt for token handling

// Define the custom JWT payload structure
interface CustomJwtPayload {
  id: string;
  email: string;
  username: string;
}

// Middleware to check if the user is authenticated
export const checkAuth = (
  req: Request & { user?: CustomJwtPayload },  // Extend the Request type to include 'user' property
  res: Response,
  next: NextFunction
): void => {
    // Ensure that req.user is present
    if (!req.user) {
        // Send a response if user is not found
        res.status(403).json({ message: 'Forbidden: No user found in request.' });
        return;  // Ensure no further code is executed after response is sent
    }

    // Proceed to the next middleware or route handler
    next(); // This will allow the request to move to the next handler
};
