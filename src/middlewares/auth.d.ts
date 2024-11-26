import { Request, Response, NextFunction } from 'express';
export declare const verifyToken: (
  req: Request,
  res: Response,
  next: NextFunction
) => Response<any> | void;
export declare const generateToken: (userId: string) => string;
