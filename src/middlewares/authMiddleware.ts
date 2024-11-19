import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import config from '../config/config'; // Adjusted import to match directory structure

// Middleware to authenticate token
const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Extract the token from the Authorization header (Bearer <token>)
  const token = req.headers['authorization']?.split(' ')[1]; // Token should be in the format "Bearer <token>"

  // If no token is provided, return a 403 Forbidden response
  if (!token) {
    return next(new Error('No token provided'));
  }
  next();
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
      return next(new Error('Unauthorized'));
    }

    // Attach the decoded user information to the request object
    req.user = { id: decoded.id, email: decoded.email, username: decoded.username };

    // Proceed to the next middleware or route handler
    next();
  } catch (err: unknown) {
    // Handle error, ensure it's an instance of Error
    if (err instanceof Error) {
      return next(new Error(err.message || 'Unauthorized')); // Pass error to the next middleware
    }
    import { Request, Response, NextFunction } from 'express';

export const someMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return next(new Error(err.message || 'Unauthorized'));
  }
  next(err); // If not an instance of Error, pass it to the next middleware
};

  }
  next(err);
};

export default authMiddleware;
