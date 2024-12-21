import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomAuthRequest } from '../types'; // Ensure the path to 'types' is correct
import { UserPayload } from '../types'; 

// Middleware to authenticate and verify the token
const authenticateToken = (
  req: CustomAuthRequest, 
  res: Response, 
  next: NextFunction
) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    // Return 401 if the token is missing
    return res.status(401).json({ message: 'Token is missing' });
  }

  // Verify the token using the secret
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      // Return 403 if the token is invalid or expired
      return res.status(403).json({ message: 'Token is invalid or expired' });
    }

    if (decoded) {
      // Attach the decoded payload to req.user
      req.user = decoded as UserPayload; 
      return next(); // Proceed to the next middleware or route handler
    }

    // Handle cases where the token doesn't contain user information
    return res.status(400).json({ message: 'Missing user information in token' });
  });
};

export default authenticateToken;
