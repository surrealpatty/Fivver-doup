// src/middlewares/authenticateToken.ts

import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken'; 
import { UserPayload } from '../types'; 
import { CustomAuthRequest } from '../types'; 

// Middleware to authenticate and decode JWT token
const authenticateToken = (
  req: CustomAuthRequest, 
  res: Response, 
  next: NextFunction
): void => { 
  // Extract the token from the Authorization header (Bearer token)
  const token = req.headers['authorization']?.split(' ')[1]; 

  // If no token is provided, return a 401 Unauthorized error
  if (!token) {
    res.status(401).json({ message: 'Token missing' });
    return;  // Exit early to prevent further code execution
  }

  // Verify the token using JWT secret key
  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    // If token verification fails
    if (err) {
      res.status(403).json({ message: 'Token is not valid' });
      return;  // Exit early if the token is invalid
    }

    // If token is valid, attach decoded user to req.user
    if (decoded) {
      req.user = decoded as UserPayload; // Add user to the request

      // Optionally, ensure the email is defined before proceeding
      if (!req.user.email) {
        res.status(400).json({ message: 'User email is missing' });
        return;  // Exit early if email is missing
      }
    } else {
      res.status(403).json({ message: 'Invalid token structure' });
      return;  // Exit early if the token structure is invalid
    }

    // Proceed to the next middleware or route handler if no issues
    next();
  });
};

export default authenticateToken;
