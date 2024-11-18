import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { config } from '../config/config'; // Assuming you're using named exports for config

// Extend the Request type to include a 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Adding 'user' property to request, which will hold decoded JWT payload
    }
  }
}

// Middleware to authenticate token
const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Extract the token from the Authorization header (Bearer <token>)
  const token = req.headers['authorization']?.split(' ')[1]; // Token should be in the format "Bearer <token>"

  // If no token is provided, return a 403 Forbidden response
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify the token using the secret key from config
  jwt.verify(token, config.JWT_SECRET as string, (err: VerifyErrors | null, decoded: JwtPayload | undefined) => {
    if (err) {
      // If there's an error in verifying the token (invalid/expired), return a 401 Unauthorized response
      return res.status(401).json({
        message: 'Unauthorized',
        error: err.message || 'Token verification failed',
      });
    }

    // Attach the decoded user information to the request object
    req.user = decoded; // 'decoded' contains the payload (user data) of the JWT

    // Proceed to the next middleware or route handler
    next();
  });
};

export default authMiddleware;
