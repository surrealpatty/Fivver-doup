// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';

// Middleware to check if authorization token is provided
export function checkAuth(req: Request, res: Response, next: NextFunction): void | Response {
  const token = req.headers['authorization'];
  if (!token) {
    // If no token is provided, respond with 403 Forbidden
    return res.status(403).json({ message: 'Forbidden: No token provided' });
  }
  // Token provided, proceed to the next middleware
  next();
}

// Middleware to validate token (you can add your actual validation logic here)
export function validateToken(req: Request, res: Response, next: NextFunction): void | Response {
  const token = req.headers['authorization'];
  if (!token) {
    // If no token is provided, respond with 403 Forbidden
    return res.status(403).json({ message: 'Forbidden: No token provided' });
  }

  // Add token validation logic here (JWT, etc.)
  // If token is valid, proceed to the next middleware
  next();
}

// Middleware to handle errors like unauthorized access (token related errors)
export function handleUnauthorizedError(err: any, req: Request, res: Response, next: NextFunction): void | Response {
  if (err) {
    // Handle unauthorized error (token-related errors)
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
  // If no error, proceed to the next middleware
  next();
}
