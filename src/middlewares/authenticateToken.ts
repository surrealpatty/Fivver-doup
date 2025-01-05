import jwt from 'jsonwebtoken'; // Import the jsonwebtoken package
import { Request, Response, NextFunction } from 'express';

// Define a type for the expected decoded JWT payload
interface UserPayload {
  id: string;
  email?: string;
  username?: string;
}

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Extend Request to include a user field with the appropriate structure
interface AuthRequest extends Request {
  user?: UserPayload; // Use the custom UserPayload type for user
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  // Define token verification options
  const options = {
    algorithms: ['HS256'], // Specify accepted algorithms
  };

  // Verify the token and handle the decoded payload
  jwt.verify(token, SECRET_KEY, options, (err: Error | null, decoded: UserPayload | string | undefined) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    if (decoded) {
      req.user = decoded as UserPayload; // Cast to UserPayload type
    } else {
      return res.status(401).json({ message: 'Invalid token structure' });
    }

    next(); // Proceed to the next middleware
  });
};
