import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import config from '../config/config'; // Ensure the path matches your project structure

// Extend the Request interface to include a user object (make it optional if not required in all routes)
declare global {
  namespace Express {
    export interface Request {
      user?: { id: string; email: string; username: string }; // Make `user` optional
    }
  }
}

// Middleware to authenticate token
const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Extract the token from the Authorization header (Bearer <token>)
  const token = req.headers['authorization']?.split(' ')[1]; // Token should be in the format "Bearer <token>"

  // If no token is provided, return a 403 Forbidden response
  if (!token) {
    return res.status(403).json({ message: 'Forbidden: No token provided' });
  }

  try {
    // Verify the token using the secret key from config
    const decoded = await new Promise<JwtPayload | null>((resolve, reject) => {
      jwt.verify(token, config.JWT_SECRET as string, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
        if (err) {
          reject(new Error(err.message || 'Token verification failed'));
        } else {
          resolve(decoded ? (decoded as JwtPayload) : null);
        }
      });
    });

    // If decoded is null, return 401 Unauthorized response
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Attach the decoded user information to the request object
    req.user = { id: decoded.id, email: decoded.email, username: decoded.username };

    // Proceed to the next middleware or route handler
    next();
  } catch (err: unknown) {
    // Handle error, ensure it's an instance of Error
    if (err instanceof Error) {
      return res.status(401).json({ message: `Unauthorized: ${err.message}` });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default authMiddleware;
