import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define the expected structure of the decoded JWT payload
interface UserPayload extends JwtPayload {
  id: string;
  email: string;
  username: string;
  tier: "free" | "paid";  // Changed 'string' to '"free" | "paid"'
}

// Augment the Request interface to include the `user` property
declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload;
  }
}

// Middleware to authenticate the token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {
  try {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token is missing or invalid' });
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not configured in the environment variables');
      return res.status(500).json({ message: 'Internal server error' });
    }

    const decoded = jwt.verify(token, jwtSecret) as UserPayload;

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token authentication failed:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
