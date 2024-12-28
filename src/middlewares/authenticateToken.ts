import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define a custom type for the user in the request
interface UserPayload extends JwtPayload {
  id: string; // Ensure the `id` is always present
  email?: string;
  username?: string;
}

// Middleware to authenticate JWT token
const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // Extract token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, return a 401 Unauthorized status
  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided.' });
  }

  try {
    // Verify the token using JWT secret (ensure it's stored in environment variables)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;

    // Store the decoded user information in the request object
    req.user = decoded; // TypeScript now knows that req.user will have the 'id' field

    // Proceed to the next middleware or route handler
    return next(); // Ensure next is called here
  } catch (error) {
    // If the token is invalid or expired, return a 403 Forbidden status
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

export default authenticateToken;
