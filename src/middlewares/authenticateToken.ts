import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';  // Import UserPayload type
import { CustomAuthRequest } from '../types';  // Import CustomAuthRequest interface

// The authenticateToken middleware ensures that the user is authenticated by verifying the JWT token
const authenticateToken = (req: CustomAuthRequest, res: Response, next: NextFunction): void => {
  // Get token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, return a 401 Unauthorized error
  if (!token) {
    res.status(401).json({ message: 'No token provided' });  // Sends response and ends the middleware chain
    return;  // Stop further execution of the middleware
  }

  try {
    // Decode the token using jwt.verify() and type the result as UserPayload
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;

    // Validate that the decoded token contains necessary fields
    if (!decoded.id || !decoded.email) {
      res.status(401).json({ message: 'Invalid token structure' });  // Sends response and ends the middleware chain
      return;  // Stop further execution of the middleware
    }

    // Attach the decoded user data to the request object (req.user)
    req.user = {
      id: decoded.id,
      email: decoded.email, // Ensure email is always available
      username: decoded.username || '',  // Provide default empty string if not available
      tier: decoded.tier || '',  // Assuming 'tier' is a part of the UserPayload, add default value if not present
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Log error and return a 401 Unauthorized error
    console.error(err);
    res.status(401).json({ message: 'Invalid or expired token' });  // Sends response and ends the middleware chain
    return;  // Stop further execution of the middleware
  }
};

export default authenticateToken;
