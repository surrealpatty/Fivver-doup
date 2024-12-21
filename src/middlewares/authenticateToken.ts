import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken'; // Importing jwt
import { CustomAuthRequest } from '../types'; // Correct import for CustomAuthRequest
import { UserPayload } from '../types'; // Import UserPayload type

// Middleware to authenticate and decode JWT token
const authenticateToken = (req: CustomAuthRequest, res: Response, next: NextFunction): void => {
  // Extract the token from the Authorization header (Bearer token)
  const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>"

  // If no token is provided, return a 401 Unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  // Verify the token using JWT secret key
  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token is not valid' });
    }

    // Check if the decoded token has the expected structure
    if (decoded) {
      // Ensure the decoded token matches the UserPayload interface
      req.user = decoded as UserPayload; // Attach decoded user to the req object

      // Optionally, ensure the email is defined before proceeding
      if (!req.user.email) {
        return res.status(400).json({ message: 'User email is missing' });
      }
    } else {
      return res.status(403).json({ message: 'Invalid token structure' });
    }

    // Proceed to the next middleware or route handler (only if no response has been sent)
    return next();  // Use return to ensure it doesn't continue further after a response
  });
};

export default authenticateToken;
