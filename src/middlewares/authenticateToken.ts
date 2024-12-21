// src/middlewares/authenticateToken.ts

import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken'; // Importing jwt
import { UserPayload } from '../types'; // Import UserPayload type
import { CustomAuthRequest } from '../types';  // Import CustomAuthRequest interface

// Middleware to authenticate and decode JWT token
const authenticateToken = (
  req: CustomAuthRequest, // Ensure req is typed as CustomAuthRequest
  res: Response,
  next: NextFunction
): void => { // Ensure function returns void
  // Extract the token from the Authorization header (Bearer token)
  const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>"

  // If no token is provided, return a 401 Unauthorized error
  if (!token) {
    res.status(401).json({ message: 'Token missing' }); // Send the response
    return; // Ensure that no further code executes
  }

  // Verify the token using JWT secret key
  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Token is not valid' }); // Send the response
      return; // Ensure that no further code executes
    }

    // Check if the decoded token has the expected structure
    if (decoded) {
      // Ensure the decoded token matches the UserPayload interface
      req.user = decoded as UserPayload; // Attach decoded user to the req object

      // Optionally, ensure the email is defined before proceeding
      if (!req.user.email) {
        res.status(400).json({ message: 'User email is missing' }); // Send the response
        return; // Ensure that no further code executes
      }
    } else {
      res.status(403).json({ message: 'Invalid token structure' }); // Send the response
      return; // Ensure that no further code executes
    }

    // Proceed to the next middleware or route handler (only if no response has been sent)
    next(); // This will only execute if a response hasn't been sent already
  });
};

export default authenticateToken;
