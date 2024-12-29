import { NextFunction, Response } from 'express';
import { CustomAuthRequest } from '../types';  // Import CustomAuthRequest
import jwt from 'jsonwebtoken';  // Import jsonwebtoken

// Middleware to authenticate and verify the token
export const authenticateToken = (
  req: CustomAuthRequest,  // Use CustomAuthRequest to correctly type 'req'
  res: Response,
  next: NextFunction
): void => {  // Keep return type as `void`
    // Extract the token from the Authorization header
    const authHeader = req.header('Authorization');
    const token = authHeader?.split(' ')[1];  // Extract token after "Bearer"

    if (!token) {
        // If no token, respond with 401 Unauthorized
        res.status(401).json({ message: 'Access token is missing' });
        return;  // Ensure to return after sending the response
    }

    try {
        // Verify the token using the JWT secret from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string; email: string; username?: string; tier?: string };  // Type the decoded payload

        // Ensure the decoded payload contains an email (required in your case)
        if (!decoded.email) {
            res.status(400).json({ message: 'Invalid token: Missing email' });
            return;  // Ensure to return after sending the response
        }

        // Attach the decoded user payload to the request object
        req.user = decoded;  // TypeScript knows that req.user is now of type UserPayload

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If the token is invalid or expired, return a 403 Forbidden response
        res.status(403).json({ message: 'Invalid or expired token' });
        return;  // Ensure to return after sending the response
    }
};
