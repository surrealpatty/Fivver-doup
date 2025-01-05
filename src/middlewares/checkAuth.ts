import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';  // Import jwt for token handling

// Define a custom interface that extends jwt.JwtPayload
interface CustomJwtPayload extends jwt.JwtPayload {
  id: string;
  email: string;
  username: string;
}

// Middleware to check if the user is authenticated
export const checkAuth = (
  req: Request & { user?: CustomJwtPayload },  // Extend the Request type to include 'user' property
  res: Response,
  next: NextFunction
): void => {  // Return void, no value should be returned from this function
    // Ensure that req.user is present
    if (!req.user) {
        res.status(403).json({ message: 'Forbidden: No user found in request.' });
        return;  // Explicitly return here to stop further execution after sending response
    }

    // Proceed to the next middleware or route handler
    next();
};
