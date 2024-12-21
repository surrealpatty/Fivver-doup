import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomAuthRequest, UserPayload } from '../types'; // Ensure these types are correctly defined and imported

// Middleware to authenticate and verify the token
const authenticateToken = (
  req: CustomAuthRequest, 
  res: Response, 
  next: NextFunction
): void => {
  // Extract the token from the Authorization header
  const authHeader = req.header('Authorization');
  const token = authHeader?.split(' ')[1]; // Retrieve the token part after "Bearer"

  if (!token) {
    // Return 401 Unauthorized if the token is missing
    res.status(401).json({ message: 'Access token is missing' });
    return;
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as UserPayload;

    // Attach the decoded payload to req.user
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Return 403 Forbidden if the token is invalid or expired
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateToken;
