import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/authMiddleware'; // Import AuthRequest for type safety
import { JwtPayload } from 'jsonwebtoken';  // Import JwtPayload for type safety

// Middleware to authenticate JWT and attach user info to the request
export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    // Attach the user object to the request, ensuring 'tier' is included
    req.user = {
      id: (decoded as JwtPayload).id,  // Explicit cast to JwtPayload
      email: (decoded as JwtPayload).email,
      username: (decoded as JwtPayload).username,
      tier: (decoded as JwtPayload).tier, // Include the 'tier' field from the decoded JWT payload
    };

    next();
  });
};
