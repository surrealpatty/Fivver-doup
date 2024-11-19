// src/middlewares/authenticateToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Interface to extend the Request type to include 'user'
interface UserRequest extends Request {
    user?: { id: string; email: string; username: string }; // Optional user object
}

// Middleware to authenticate token
export const authenticateToken = (req: UserRequest, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization'];

    if (!token) {
        // Return an error response if no token is found
        return res.status(403).json({ message: 'Forbidden: No token provided' });
    }

    // Token format: Bearer <token>
    const tokenWithoutBearer = token.split(' ')[1]; // Remove the 'Bearer ' part

    if (!tokenWithoutBearer) {
        // Return an error response if the token is malformed
        return res.status(403).json({ message: 'Forbidden: No token provided' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET as string);

        // Ensure that decoded is an object with the necessary properties
        if (typeof decoded !== 'object' || !decoded.id || !decoded.email || !decoded.username) {
            return res.status(403).json({ message: 'Forbidden: Invalid token data' });
        }

        // Attach decoded user information to the request object
        req.user = decoded as { id: string; email: string; username: string };

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Invalid token:', error);
        return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
    }
};
