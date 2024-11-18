import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'; // Import JwtPayload for decoding
import * as config from '../config/config'; // Assuming you export config as a namespace

// Extend the Request type to include 'user' (in case it's not declared globally)
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Type for the user object attached to the request
    }
  }
}

// Middleware to authenticate token
const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    // jwt.verify with proper type for 'err' and 'decoded'
    jwt.verify(token, config.JWT_SECRET, (err: any, decoded: JwtPayload | undefined) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = decoded; // Attach user object to request after decoding
        next();
    });
};

export default authMiddleware;
