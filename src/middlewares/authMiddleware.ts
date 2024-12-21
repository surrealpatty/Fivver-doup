import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken'; // Importing jwt
import { CustomAuthRequest } from '../types';  // Correct import for CustomAuthRequest
import { UserPayload } from '../types';  // Import UserPayload type

// Middleware to authenticate and decode JWT token
const authenticateToken = (req: CustomAuthRequest, res: Response, next: NextFunction): void => {
    // Extract the token from the Authorization header (Bearer token)
    const token = req.headers['authorization']?.split(' ')[1];  // "Bearer <token>"

    // If no token is provided, return a 401 Unauthorized error
    if (!token) {
        res.status(401).json({ message: 'Token missing' });
        return;  // Explicitly return here to stop further execution
    }

    // Verify the token using JWT secret key
    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Token is not valid' });
            return;  // Explicitly return here to stop further execution
        }

        // Ensure the decoded token (user) matches the UserPayload interface
        req.user = user as UserPayload; // Attach decoded user to the req object

        // Proceed to the next middleware or route handler
        next();  // Use next to pass control to the next middleware
    });
};

export default authenticateToken;
