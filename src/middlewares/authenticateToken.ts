import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Middleware to authenticate JWT token
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Extract token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, return a 401 Unauthorized status
  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided.' });
  }

  try {
    // Verify the token using JWT secret (ensure it's stored in environment variables)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Store the decoded user information in the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, return a 403 Forbidden status
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

export default authenticateToken;
