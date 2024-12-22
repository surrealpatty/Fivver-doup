import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomAuthRequest, UserPayload } from '../types';  // Ensure correct import of types

// Middleware to authenticate and verify the token
const authenticateToken = (
  req: CustomAuthRequest,  // Use CustomAuthRequest type
  res: Response, 
  next: NextFunction
): void => {  // Ensure the return type is void
  // Extract the token from the Authorization header
  const authHeader = req.header('Authorization');
  const token = authHeader?.split(' ')[1];  // Retrieve token after "Bearer"

  if (!token) {
    // Return 401 Unauthorized if the token is missing
    res.status(401).json({ message: 'Access token is missing' });
    return;  // Prevent further execution
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as UserPayload;

    // Ensure the email is present in the decoded payload (mandatory)
    if (!decoded.email) {
      res.status(400).json({ message: 'Invalid token: Missing email' });
      return;  // Prevent further execution
    }

    // Attach the decoded payload to req.user (ensure user type matches UserPayload)
    req.user = decoded;  // TypeScript will now know that req.user is of type UserPayload

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Return 403 Forbidden if the token is invalid or expired
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateToken;
