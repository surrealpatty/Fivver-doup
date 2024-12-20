import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomAuthRequest } from '../types';  // Import CustomAuthRequest type

// The authenticateToken middleware ensures that the user is authenticated by verifying the JWT token
const authenticateToken = (req: CustomAuthRequest, res: Response, next: NextFunction): void | Response => {
  // Get token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1];  // Extract token from Authorization header

  // If no token is provided, return a 401 Unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    // Decode the token using jwt.verify() and type the result as CustomAuthRequest['user']
    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
      if (err || !decoded) {
        // If the token is invalid or expired, return a 403 Forbidden error
        return res.status(403).json({ message: 'Token is not valid' });
      }

      // Ensure decoded user matches CustomAuthRequest['user']
      const user = decoded as CustomAuthRequest['user'];  // Type assertion to match the type

      // Attach the decoded user data to the request object (req.user)
      req.user = user;  // TypeScript now understands that req.user is of type CustomAuthRequest['user']

      // Proceed to the next middleware or route handler
      next();
    });
  } catch (err) {
    // If an unexpected error occurs, log it and return a 401 Unauthorized error
    console.error(err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateToken;
