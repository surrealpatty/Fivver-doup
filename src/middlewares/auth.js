import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';  // Ensure you're using TypeScript imports for config

const JWT_SECRET = config.JWT_SECRET; // Access the secret from config
const JWT_EXPIRATION = config.JWT_EXPIRATION || '1h'; // Default expiration if not defined

// Middleware to generate a JWT token
export const generateToken = (userId: number): string => {
    return jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION, // Use expiration from config
    });
};

// Middleware to verify the JWT token
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the Authorization header

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized', error: err.message });
        }

        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            req.userId = (decoded as { id: number }).id; // Type-safe access to decoded userId
            next(); // Proceed to the next middleware or route handler
        } else {
            return res.status(401).json({ message: 'Invalid token' });
        }
    });
};
