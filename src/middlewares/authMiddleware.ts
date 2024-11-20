// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';

export function checkAuth(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Forbidden: No token provided' });
  }

  // Proceed with token validation...
  next();
}

export function validateToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  // Token validation logic...
  next();
}

export function handleUnauthorizedError(err: any, req: Request, res: Response, next: NextFunction): void {
  if (err) {
    return res.status(401).json({ message: `Unauthorized: ${err.message}` });
  }
  next();
}
