// src/middlewares/authenticateToken.ts

import { CustomAuthRequest } from '../types';  // Import CustomAuthRequest
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';  // Import jsonwebtoken for decoding the JWT
import { UserPayload } from '../types';  // Import the UserPayload type

// Middleware to authenticate and verify the token
export const authenticateToken = (
  req: CustomAuthRequest, 
  res: Response, 
  next: NextFunction
): void => {  // Ensure the return type is void, as it doesn't return a value
    // Extract the token from the Authorization header
    const authHeader = req.header('Authorization');
    const token = authHeader?.split(' ')[1];  // Retrieve token after "Bearer"

    if (!token) {
        // Return 401 Unauthorized if the token is missing
        res.status(401).json({ message: 'Access token is missing' });
        return;  // Prevents further execution, ensures nothing is returned
    }

    try {
        // Verify the token using the secret and decode it to match the UserPayload type
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as UserPayload;

        // Ensure the email is present in the decoded payload (mandatory)
        if (!decoded.email) {
            res.status(400).json({ message: 'Invalid token: Missing email' });
            return;  // Prevents further execution, ensures nothing is returned
        }

        // Attach the decoded payload to req.user (ensure user type matches UserPayload)
        req.user = decoded;  // TypeScript knows that req.user is now of type UserPayload

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Return 403 Forbidden if the token is invalid or expired
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};
