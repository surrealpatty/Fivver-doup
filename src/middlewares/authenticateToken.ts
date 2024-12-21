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
    res.status(401).json({ message: 'Token missing' });
    return; // Ensure that we stop further execution
  }

  // Verify the token using JWT secret key
  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Token is not valid' });
      return; // Stop further execution if the token is invalid
    }

    // Check if the decoded token has the expected structure
    if (decoded) {
      // Ensure the decoded token matches the UserPayload interface
      req.user = decoded as UserPayload; // Attach decoded user to the req object

      // Optionally, ensure the email is defined before proceeding
      if (!req.user.email) {
        res.status(400).json({ message: 'User email is missing' });
        return; // Stop execution if email is missing
      }
    } else {
      res.status(403).json({ message: 'Invalid token structure' });
      return; // Stop execution if token structure is invalid
    }

    // Proceed to the next middleware or route handler (only if no response has been sent)
    next();  // Proceed to the next middleware or route handler
  });
};

export default authenticateToken;
