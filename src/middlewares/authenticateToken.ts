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
        return res.sendStatus(403); // Forbidden if no token is provided
    }

    // Token format: Bearer <token>
    const tokenWithoutBearer = token.split(' ')[1]; // Remove the 'Bearer ' part

    if (!tokenWithoutBearer) {
        return res.sendStatus(403); // Forbidden if token is malformed
    }

    try {
        // Verify the token using the secret
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET as string);

        // Attach decoded user information to the request object
        req.user = decoded as { id: string; email: string; username: string };

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Invalid token:', error);
        return res.status(403).json({ message: 'Invalid token.' }); // Forbidden with error message
    }
};
