import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'; // Import VerifyErrors for type safety
import * as config from '../config/config'; // Assuming you export the config properly

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

  // Simplified the verification process
  jwt.verify(token, config.JWT_SECRET, (err: VerifyErrors | null, decoded: JwtPayload | undefined) => {
    if (err) {
      // Respond with unauthorized if there's an error
      return res.status(401).json({ message: 'Unauthorized', error: err?.message });
    }

    req.user = decoded; // Attach user object to request after decoding
    next(); // Call next middleware or route handler
  });
};

export default authMiddleware;
