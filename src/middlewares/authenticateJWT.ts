import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/authMiddleware';  // Import AuthRequest for type safety
import { JwtPayload } from 'jsonwebtoken';  // Import JwtPayload for type safety

// Middleware to authenticate JWT and attach user info to the request
export const authenticateJWT = (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> | void => {  // The return type is now `Promise<void>` or `void`
  const token = req.headers['authorization']?.split(' ')[1];  // Extract token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });  // Return response and stop execution
  }

  // Verify the token using the secret key
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token.' });  // Return response and stop execution
      }

      // Attach the user object to the request, ensuring 'tier' is included
      req.user = {
        id: (decoded as JwtPayload).id,  // Explicit cast to JwtPayload
        email: (decoded as JwtPayload).email,
        username: (decoded as JwtPayload).username,
        tier: (decoded as JwtPayload).tier, // Include the 'tier' field from the decoded JWT payload
      };

      next();  // Proceed to the next middleware or route handler
      resolve();  // Resolve the promise once done
    });
  });
};
