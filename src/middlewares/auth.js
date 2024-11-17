import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config'; // Ensure you're using TypeScript imports for config

// Access the secret and expiration from the config
const JWT_SECRET = config.JWT_SECRET;
const JWT_EXPIRATION = config.JWT_EXPIRATION || '1h';  // Default expiration if not defined

// Extend the Request interface to include the `userId` property
declare global {
    namespace Express {
        interface Request {
            userId?: number;  // Make sure `userId` is optional, as it may not exist on all requests
        }
    }
}

// Middleware to generate a JWT token
export const generateToken = (userId: number): string => {
    // Ensure that the JWT token is signed using the correct secret and expiration time
    return jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
    });
};

// Middleware to verify the JWT token
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    // Extract the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1];

    // If no token is provided, return a 403 error
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized', error: err.message });
        }

        // If the token is valid, set the user ID on the request object
        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            req.userId = (decoded as { id: number }).id;  // Type-safe access to decoded userId
            next();  // Proceed to the next middleware or route handler
        } else {
            return res.status(401).json({ message: 'Invalid token' });
        }
    });
};
