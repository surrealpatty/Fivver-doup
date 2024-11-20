import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // Check if authorization header is present
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ message: 'Forbidden: No token provided' });
  }

  // Extract token from the authorization header
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Forbidden: No token provided' });
  }

  // Secret key should come from environment variables (for security)
  const secretKey = process.env.JWT_SECRET || 'your_jwt_secret';

  try {
    // Verify the token using jwt.verify and secret key
    const decoded = jwt.verify(token, secretKey) as { userId: string }; // Decoded token will contain userId
    req.user = { id: decoded.userId }; // Attach decoded user information to the request object
    next(); // Token is valid, proceed to the next middleware
  } catch (error) {
    // Handle errors (e.g., invalid or expired token)
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

export default authenticateToken;
