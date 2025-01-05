import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Define the structure of the JWT payload (user)
interface UserPayload {
  id: string;
  email?: string;
  username?: string;
}

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Extend Request to include the user field with the appropriate type
interface AuthRequest extends Request {
  user?: UserPayload; // Ensure the user is of type UserPayload, not null or Record<string, any>
}

export const authenticateToken = (
  req: AuthRequest, // Use AuthRequest interface to extend the user field
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  // Verify the token and decode the payload
  jwt.verify(token, SECRET_KEY, (err: Error | null, decoded: UserPayload | undefined) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Attach decoded user data to the request
    req.user = decoded; 

    // Proceed to the next middleware
    next();
  });
};
