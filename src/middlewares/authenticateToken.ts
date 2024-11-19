import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; // Corrected import for jsonwebtoken

// Middleware to authenticate token
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string); // Verify token with secret from environment variable

        // Assuming you have a user ID in the token, you can attach it to the request object
        req.user = decoded; // Attach the decoded user information to the request object

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Invalid token:', error);
        return res.status(403).json({ message: 'Invalid token.' });
    }
};
