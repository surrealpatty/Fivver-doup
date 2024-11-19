// src/middlewares/authenticateToken.ts

import { Request, Response, NextFunction } from 'express';

const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.headers.authorization) {
    res.status(403).json({ message: 'Forbidden: No token provided' });
return; // Ensure function exits after sending the response
  }

  // Example of how you should check the token validity:
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    res.status(403).json({ message: 'Forbidden: No token provided' });
return; // Ensure function exits after sending the response
  }

  // Verify the token logic here:
  try {
    // You should use a real JWT verification process here
    // Example of the logic that could go wrong:
    // jwt.verify(token, secretKey);

    next(); // Token is valid, proceed to the next middleware
  } catch (error) {
    res.status(403).json({ message: 'Forbidden: No token provided' });
return; // Ensure function exits after sending the response
  }
};

export default authenticateToken;
