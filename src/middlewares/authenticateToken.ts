import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomAuthRequest } from '../types';  // Correct import for CustomAuthRequest type
import { UserPayload } from '../types';  // Ensure correct import of UserPayload

const authenticateToken = (
  req: CustomAuthRequest, 
  res: Response, 
  next: NextFunction
): void => {
  // Get token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1];  // Extract token from Authorization header

  // If no token is provided, return a 401 Unauthorized error
  if (!token) {
    res.status(401).json({ message: 'Token missing' });  // Send a response directly
    return;  // Stop further execution if no token
  }

  // Verify the token and decode it
  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    if (err || !decoded) {
      // If the token is invalid or expired, return a 403 Forbidden error
      res.status(403).json({ message: 'Token is not valid' });  // Send a response directly
      return;  // Stop further execution if token verification fails
    }

    // Ensure the decoded token is typed as UserPayload (type assertion)
    const user = decoded as UserPayload;  // Decode and type the decoded value as UserPayload

    // Attach the decoded user data to the request object (req.user)
    req.user = user;  // TypeScript now understands that req.user is of type UserPayload

    // Proceed to the next middleware or route handler
    next();  // Call next() to pass control to the next middleware or route handler
  });
};

export default authenticateToken;
