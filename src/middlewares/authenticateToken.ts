import { CustomAuthRequest } from '../types/auth';  // Import CustomAuthRequest type
import { Response, NextFunction } from 'express';  // Import Response and NextFunction from express
import jwt from 'jsonwebtoken';  // Import jsonwebtoken for decoding the JWT
import { UserPayload } from '../types';  // Import the UserPayload type

// Middleware to authenticate and verify the token
export const authenticateToken = (
  req: CustomAuthRequest,  // Use CustomAuthRequest to correctly type 'req'
  res: Response,
  next: NextFunction
): void => {  // The return type is void since we don't return anything directly here
    // Extract the token from the Authorization header
    const authHeader = req.header('Authorization');
    const token = authHeader?.split(' ')[1];  // Extract token after "Bearer"

    if (!token) {
        // If no token, respond with 401 Unauthorized
        res.status(401).json({ message: 'Access token is missing' });
        return;  // Ensure the middleware stops executing here
    }

    try {
        // Verify the token using the JWT secret from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as UserPayload;

        // Ensure the decoded payload contains an email (required in your case)
        if (!decoded.email) {
            res.status(400).json({ message: 'Invalid token: Missing email' });
            return;  // Stop execution here after sending a response
        }

        // Attach the decoded user payload to the request object
        req.user = decoded;  // TypeScript knows that req.user is now of type UserPayload

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If the token is invalid or expired, return a 403 Forbidden response
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};
