import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomAuthRequest } from '../types';  // Import CustomAuthRequest type
import { UserPayload } from '../types';  // Import UserPayload type

const authenticateToken = (
  req: CustomAuthRequest, 
  res: Response, 
  next: NextFunction
): void => {
  // Extract the token from the Authorization header (Bearer token)
  const token = req.headers['authorization']?.split(' ')[1];  // "Bearer <token>"

  // If no token is provided, return a 401 Unauthorized error
  if (!token) {
    res.status(401).json({ message: 'Token missing' }); // Directly return response if no token
    return;  // Stop further execution if no token is found
  }

  // Verify the token using JWT secret key
  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    if (err || !decoded) {
      // If token is invalid or expired, return a 403 Forbidden error
      res.status(403).json({ message: 'Token is not valid' }); // Directly return response if verification fails
      return;  // Stop further execution if token is invalid
    }

    // Decode and type the token as UserPayload
    const user = decoded as UserPayload;  // Type assertion to UserPayload

    // Attach the decoded user data to the request object (req.user)
    req.user = user;

    // Proceed to the next middleware or route handler
    next();  // Pass control to the next middleware or handler if token is valid
  });
};


export default authenticateToken;
