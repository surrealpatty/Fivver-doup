import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { CustomAuthRequest } from '../types'; // Adjust the path if needed

// Define the interface for the decoded token payload
interface DecodedToken {
  id: string;
  email: string;
  username: string;
  tier: 'free' | 'paid';  // Ensure tier is either 'free' or 'paid'
  role?: 'admin' | 'user';  // Optional role
}

// Middleware to authenticate and attach user information from the JWT token
export const authenticateToken = (req: CustomAuthRequest, res: Response, next: NextFunction) => {
  // Extract the token from the Authorization header (format: "Bearer <token>")
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, respond with a 401 Unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }

  try {
    // Verify and decode the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    // Attach the decoded user information to the request object
    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      tier: decoded.tier === 'free' || decoded.tier === 'paid' ? decoded.tier : 'free',  // Default tier to 'free' if invalid
      role: decoded.role === 'admin' || decoded.role === 'user' ? decoded.role : 'user',  // Default role to 'user' if invalid
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, return a 400 Bad Request error
    return res.status(400).json({ message: 'Invalid token. Access denied.' });
  }
};
