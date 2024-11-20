import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define the expected structure of the decoded JWT payload
interface UserPayload extends JwtPayload {
  id: string;
  email: string;
  username: string;
}

// Named export for authenticateToken
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is in 'Authorization' header

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Cast the decoded value to UserPayload
    req.user = decoded as UserPayload; // Ensure req.user matches the expected structure
    next();
  });
};
