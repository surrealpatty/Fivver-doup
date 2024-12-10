import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';  // Correct import path

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
  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: JwtPayload | undefined) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token.' });
      return;  // Ensure that the middleware stops execution
    }

    // Ensure that decoded is not undefined
    if (decoded) {
      // Attach the user object to the request, ensuring 'tier' and 'role' are included
      req.user = {
        id: decoded.id,  // Explicitly access properties from decoded JwtPayload
        email: decoded.email,
        username: decoded.username,
        tier: decoded.tier,  // Include 'tier' from the JWT payload
        role: decoded.role,  // Include 'role' from the JWT payload
      };
    }

    next();  // Proceed to the next middleware or route handler
  });
};
