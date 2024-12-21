import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/index';

export interface CustomAuthRequest extends Request {
    user?: UserPayload;
}

export const authenticateToken = (
    req: CustomAuthRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token.' });
        }

        // Ensure the payload matches UserPayload
        req.user = {
            id: (user as UserPayload).id,
            email: (user as UserPayload).email ?? '', // Default to empty string if undefined
            username: (user as UserPayload).username,
        };

        next();
    });
};
