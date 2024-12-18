import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomAuthRequest, UserPayload } from '../types'; // Correct import for CustomAuthRequest and UserPayload

// Middleware to authenticate a token
export const authenticateToken = (
  req: CustomAuthRequest,  // Use CustomAuthRequest for req type
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']; // Get the authorization header
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token with the correct callback signature
  jwt.verify(token, process.env.JWT_SECRET!, (err: jwt.JsonWebTokenError | null, decoded: UserPayload | JwtPayload | undefined) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    if (decoded) {
      req.user = decoded as UserPayload; // Cast 'decoded' to 'UserPayload'
      next();
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  });
};
