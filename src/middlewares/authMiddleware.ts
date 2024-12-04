import { Request, Response, NextFunction } from 'express';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // Your authentication logic here
};

export const checkAuth = (req: Request, res: Response, next: NextFunction): void => {
  // Some logic for checking auth
  next();
};
