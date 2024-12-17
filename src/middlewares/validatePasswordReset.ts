// src/middlewares/validatePasswordReset.ts

import { Request, Response, NextFunction } from 'express';

// Middleware to validate password reset requests
export const validatePasswordReset = (req: Request, res: Response, next: NextFunction) => {
  const { email, token, newPassword } = req.body;

  // Check if the required fields are present in the request body
  if (!email || !token || !newPassword) {
    return res.status(400).json({ message: 'Missing required fields: email, token, or newPassword' });
  }

  // You can add more validation logic here as needed (e.g., email format validation, password strength check)
  
  // If validation passes, proceed to the next middleware/controller
  next();
};
