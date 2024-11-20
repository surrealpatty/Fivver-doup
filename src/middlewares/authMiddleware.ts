import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define the expected structure of the decoded JWT payload
interface UserPayload extends JwtPayload {
  id: string;       // Ensure this matches the type you expect from your token
  email: string;
  username: string;
}

// Named export for authenticateToken
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Get token from 'Authorization' header, assuming it is in the format: 'Bearer <token>'
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  // Verify the token using JWT secret
  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Ensure decoded is cast to UserPayload for further type safety
    if (decoded) {
      req.user = decoded as UserPayload; // Cast to the UserPayload interface
      next();
    } else {
      return res.status(401).json({ message: 'Token verification failed' });
    }
  });
};
