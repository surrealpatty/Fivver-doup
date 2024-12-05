// src/middlewares/authMiddleware.ts

import { Response, NextFunction } from 'express';
import jwt, { JwtPayload as JWTDecodedPayload } from 'jsonwebtoken';  // Import JwtPayload from jsonwebtoken
import { AuthRequest } from '../types/authMiddleware';  // Correct import for custom request type
import { UserPayload } from '../types/authMiddleware';  // Ensure proper import of UserPayload type

// Define your JWT secret key (make sure this is securely handled in production, e.g., from environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';  // Use an environment variable for security

// Middleware to authenticate JWT token
export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];  // Bearer token
  
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token and decode it
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    // Ensure decoded is typed as JwtPayload, and assert as UserPayload for proper typing
    const decodedPayload = decoded as JWTDecodedPayload & UserPayload;  // Correct typing with tier included

    // Attach the user data to the request object
    req.user = {
      id: decodedPayload.id,
      email: decodedPayload.email,
      username: decodedPayload.username,
      tier: decodedPayload.tier,  // Ensure 'tier' is present
    };

    // Pass control to the next middleware
    next();
  });
};
