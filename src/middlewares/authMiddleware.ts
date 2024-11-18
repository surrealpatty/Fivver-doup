import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { config } from '../config/config'; // TypeScript knows the types now

// Extend the Request type to include a 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Adding 'user' property to request, which will hold decoded JWT payload
    }
  }
}

// Middleware to authenticate token
const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Extract the token from the Authorization header (Bearer <token>)
  const token = req.headers['authorization']?.split(' ')[1]; // Token should be in the format "Bearer <token>"

  // If no token is provided, return a 403 Forbidden response
  if (!token) {
    res.status(403).json({ message: 'No token provided' });
    return; // Stop further execution
  }

  try {
    // Verify the token using the secret key from config, wrapped in a Promise for async/await usage
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
      res.status(401).json({ message: 'Unauthorized' });
      return; // Stop further execution
    }

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err: unknown) {
    // Handle error, ensure it's an instance of Error
    if (err instanceof Error) {
      res.status(401).json({ message: 'Unauthorized', error: err.message });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
};

export default authMiddleware;
