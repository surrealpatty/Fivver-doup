import { Request, Response, NextFunction } from 'express';
export declare const checkAuth: (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
