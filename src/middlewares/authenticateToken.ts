import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomAuthRequest } from '../types';  // Correct import path for CustomAuthRequest
import { UserPayload } from '../types';  // Correct import path for UserPayload

// Middleware to authenticate the token and set the user in the request
const authenticateToken = (req: CustomAuthRequest, res: Response, next: NextFunction) => {
  // Extract token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1];  // Expecting "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify the token using jwt.verify
  jwt.verify(token, process.env.JWT_SECRET_KEY || '', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Ensure decoded is a valid JwtPayload and safely cast to UserPayload
    if (decoded && typeof decoded !== 'string') {
      const { id, email, username, tier } = decoded;  // Destructure the necessary fields
      
      // Safely assign the decoded values to req.user with fallback for optional fields
      req.user = {
        id,  // decoded.id is required
        email: email || '',  // Default to empty string if email is missing
        username: username || '',  // Default to empty string if username is missing
        tier: tier || '',  // Default to empty string if tier is missing
      };
    } else {
      return res.status(403).json({ message: 'Invalid token format' });
    }

    // Proceed to the next middleware or route handler
    next();
  });
};

export default authenticateToken;
