import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define the expected structure of the decoded JWT payload
interface UserPayload extends JwtPayload {
  id: string;
  email: string;
  username: string;
}

// Middleware to authenticate token
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // Extract token from 'Authorization' header (Assuming format: 'Bearer <token>')
  const token = req.headers['authorization']?.split(' ')[1];

  // If token is not present, return 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  const jwtSecret = process.env.JWT_SECRET;

  // If JWT_SECRET is missing from environment variables, return a server error
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

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Token verification failed:', error);

    // Return a 403 Forbidden error if the token is invalid or expired
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
