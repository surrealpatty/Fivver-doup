import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/authMiddleware';  // Import AuthRequest for type safety
import { JwtPayload } from 'jsonwebtoken';  // Import JwtPayload for type safety

// Middleware to authenticate JWT and attach user info to the request
export const authenticateJWT = (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): void => {  // Return type is void, as it's standard for middleware
  const token = req.headers['authorization']?.split(' ')[1];  // Extract token from Authorization header

  // If no token is provided, return a 403 response
  if (!token) {
    res.status(403).json({ message: 'No token provided.' });
    return;  // Ensure that the middleware stops execution
  }

  // Verify the token using the secret key (this is a synchronous check)
  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token.' });
      return;  // Ensure that the middleware stops execution
    }

    // Attach the user object to the request, ensuring 'tier' is included
    req.user = {
      id: (decoded as JwtPayload).id,  // Explicit cast to JwtPayload
      email: (decoded as JwtPayload).email,
      username: (decoded as JwtPayload).username,
      tier: (decoded as JwtPayload).tier,  // Include 'tier' from the JWT payload
    };

    next();  // Proceed to the next middleware or route handler
  });
};
