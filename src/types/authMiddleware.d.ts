declare module '../middlewares/authMiddleware' {
    import { Request, Response, NextFunction } from 'express';
  
    export function authenticateToken(req: Request, res: Response, next: NextFunction): void;
  }
  