import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Extend Express Request interface to include `user` field
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string; username: string }; // Define the structure of the user attached to req
    }
  }
}

// Define the expected structure of the decoded JWT payload
interface UserPayload extends JwtPayload {
  id: string;
  email: string;
  username: string;
}

// Named export for authenticateToken middleware
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // Extract token from 'Authorization' header (Assuming format: 'Bearer <token>')
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({ message: 'Server configuration error: Missing JWT_SECRET' });
  }

  try {
    // Verify the token using JWT secret
    const decoded = jwt.verify(token, jwtSecret) as UserPayload;

    // Attach the decoded user data to the request object
    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
    };

    // Call next middleware or route handler
    next();
  } catch (error) {
    // Log the error for debugging, but do not expose the full error to the client
    console.error('Token verification failed:', error);

    // Return a generic error message
    return res.status(403).json({ message: 'Invalid or
