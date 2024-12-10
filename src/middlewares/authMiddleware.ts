import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/index'; // Correct path for your types

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Use your actual secret key

// Exporting authenticateToken for use in other parts of the app
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {  // Return type is now 'void | Response'
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is passed as "Bearer token"

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' }); // Return a response and stop further execution
  }

  try {
    // Verify the token and assign the decoded payload to UserPayload type
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;

    // Check if the decoded token contains necessary information
    if (!decoded.email || !decoded.username) {
      console.warn('User payload is missing required information');
      return res.status(400).json({ message: 'User payload is missing email or username' }); // Return error if missing info
    }

    // Attach the decoded user information to the request object for further use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' }); // Return error if token is invalid
  }
};
