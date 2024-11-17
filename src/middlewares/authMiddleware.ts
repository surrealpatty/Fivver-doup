// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Extend the Request type to include `userId`
declare global {
    namespace Express {
        interface Request {
            userId?: number;  // Add `userId` to the request object
        }
    }
}

// Authentication middleware to verify JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Extract the token from the Authorization header (Bearer token)
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        return res.status(500).json({ message: 'Server configuration error: Missing JWT_SECRET' });
    }

    try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload & { userId: number };

        // Attach the `userId` to the request object
        req.userId = decoded.userId;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
