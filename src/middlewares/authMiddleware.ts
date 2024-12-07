import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; // Iport jwt for token verification
import { UserPayload } from '../types';  // Adjust if necessary

const secretKey = 'your-secret-key'; // Replace with your actual secret key

export const authenticateJWT = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from header

    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Token is not valid' });
        }

        // Type the decoded value as UserPayload
        req.user = decoded as UserPayload; // Ensure it matches UserPayload structure
        next(); // Proceed to the next middleware or route handler
      });
    } else {
      res.status(401).json({ message: 'Unauthorized, no token provided' });
    }
  } catch (error) {
    next(error); // Pass any error to the next error handler
  }
};
