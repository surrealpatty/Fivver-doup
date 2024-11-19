import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; // Corrected import for jsonwebtoken

// Middleware to authenticate token
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.sendStatus(403); // Forbidden if no token is provided
    }

    try {
        // Remove duplicate token check
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        
        // Attach decoded user information to the request object
        req.user = decoded as { id: string; email: string; username: string };

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Invalid token:', error);
        return res.status(403).json({ message: 'Invalid token.' }); // Forbidden if token is invalid
    }
};
