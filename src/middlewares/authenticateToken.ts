import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define an interface for the user data that will be attached to the request
interface User {
  id: string; // Adjust the structure of this as per your JWT payload
}

const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // Check if authorization header is present
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ message: 'Forbidden: No token provided' });
  }

  // Extract token from the authorization header (Bearer <token>)
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Forbidden: No token provided' });
  }

  // Secret key should come from environment variables (for security)
  const secretKey = process.env.JWT_SECRET || 'your_jwt_secret';

  try {
    // Verify the token using jwt.verify and secret key
    const decoded = jwt.verify(token, secretKey) as { userId: string }; // Assuming your JWT contains a userId

    // Attach decoded user information to the request object
    req.user = { id: decoded.userId }; // Add userId to req.user (or any other fields you want to access)

    next(); // Token is valid, proceed to the next middleware
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};

export default authenticateToken;
