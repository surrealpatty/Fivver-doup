import { Request, Response, NextFunction } from 'express';

// Middleware to validate user registration data
export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
  const { email, username, password } = req.body;

  // Validate that email, username, and password are provided
  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Email, username, and password are required' });
  }

  // Additional validation logic (e.g., regex for email format) can be added here

  next(); // Proceed to the next middleware or route handler if validation passes
};
