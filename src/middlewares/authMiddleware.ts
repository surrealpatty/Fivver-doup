import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../types/index'; // Make sure the import path is correct

// Middleware to authenticate the user (this is just a simple example)
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Assuming `user` comes from your authentication logic (e.g., JWT token or session)
    const user = { 
      id: '123',
      email: 'user@example.com',
      username: 'exampleUser',
      tier: 'paid' // This should come from your authentication source (e.g., DB, JWT)
    };

    // Construct the payload object (make sure 'tier' is included)
    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      tier: user.tier, // Ensure this is set properly
    };

    // Assign the payload to req.user
    req.user = payload;

    // Move on to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};
