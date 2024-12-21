import { CustomAuthRequest } from '../types/user';  // Correct import for CustomAuthRequest
import jwt from 'jsonwebtoken';  // Importing jwt
import { NextFunction, Response } from 'express';  // Correct imports for NextFunction and Response
import { UserPayload } from '../types/user';  // Correct import for UserPayload

// Middleware to authenticate and decode JWT token
const authenticateTokenMiddleware = (
  req: CustomAuthRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {  // Set return type to Promise<void> for async handling
  return new Promise((resolve, reject) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Extract token

    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
      if (err || !decoded) {
        return res.status(403).json({ message: 'Token is not valid' });
      }

      // Decode and type the token as UserPayload
      const user = decoded as UserPayload;  // Type assertion

      // Attach the decoded user data to the request object
      req.user = user;

      // Proceed to next middleware or route handler
      next();
      resolve();  // Resolve promise after next()
    });
  });
};

export default authenticateTokenMiddleware;
