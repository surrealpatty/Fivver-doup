import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import config from '../config/config';

// Middleware to authenticate token
const authMiddleware = async (req: Request & { user?: { id: number } }, res: Response, next: NextFunction): Promise<void> => {
  // Extract the token from the Authorization header (Bearer <token>)
  const token = req.headers['authorization']?.split(' ')[1]; // Token should be in the format "Bearer <token>"

  // If no token is provided, return a 403 Forbidden response
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
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
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Attach the decoded user information to the request object
    req.user = { id: decoded.id };

    // Proceed to the next middleware or route handler
    next();
  } catch (err: unknown) {
    // Specific error handling for token expiration or invalid token
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired' });
    }

    // General error handling
    if (err instanceof Error) {
      return res.status(401).json({ message: 'Unauthorized', error: err.message });
    }

    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authMiddleware;
