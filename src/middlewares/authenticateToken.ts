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
export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Extract token from 'Authorization' header
  const token = req.headers['authorization']?.split(' ')[1]; // Assumes 'Bearer <token>' format

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  try {
    // Verify the token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as UserPayload;

    // Attach the decoded user data to the request object
    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
    };

    // Call next middleware
    next();
  } catch (error) {
    // Handle token verification errors
    console.error('Token verification failed:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
