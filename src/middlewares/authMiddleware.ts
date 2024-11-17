// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Extend the Request type to include `userId`
declare global {
    namespace Express {
        interface Request {
            userId?: number;  // Keep this as a number if you want `userId` to be a number
        }
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
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
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload & { userId: string };  // Change to string if the id is a string

        // Convert userId to number (assuming it's a string in the token)
        req.userId = Number(decoded.userId);  // Convert string to number if needed

        if (isNaN(req.userId)) {
            return res.status(400).json({ message: 'Invalid userId in token' });
        }

        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
