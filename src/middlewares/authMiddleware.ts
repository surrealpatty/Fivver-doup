import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';  // Importing JwtPayload type
import { CustomAuthRequest } from '../types';  // Correct import for CustomAuthRequest
import { UserPayload } from '../types';  // Import UserPayload type

// Middleware to authenticate and decode JWT token
const authenticateToken = (
  req: CustomAuthRequest, 
  res: Response, 
  next: NextFunction
): void => {
  // Extract the token from the Authorization header (Bearer token)
  const token = req.headers['authorization']?.split(' ')[1];  // "Bearer <token>"

  // If no token is provided, return a 401 Unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  // Verify the token using JWT secret key
  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    if (err || !decoded) {
      // If token is invalid or expired, return a 403 Forbidden error
      return res.status(403).json({ message: 'Token is not valid' });
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
