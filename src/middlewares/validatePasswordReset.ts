import { Request, Response, NextFunction } from 'express';

// Middleware to validate password reset requests
export const validatePasswordReset = (req: Request, res: Response, next: NextFunction): void | Response => {
  const { email, token, newPassword } = req.body;

  // Check if the required fields are present in the request body
  if (!email || !token || !newPassword) {
    return res.status(400).json({ message: 'Missing required fields: email, token, or newPassword' });
  }

  // Example additional validation: Check if the email is in a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Example additional validation: Check the password strength (this is just a simple example)
  if (newPassword.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  // If all validations pass, proceed to the next middleware/controller
  next();
};
