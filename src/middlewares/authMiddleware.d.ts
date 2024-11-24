import { Request, Response, NextFunction } from 'express';
/**
 * Middleware to authenticate the token provided in the Authorization header.
 * If the token is valid, the decoded payload is attached to `req.user`.
 */
export declare const authenticateToken: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Middleware to check if the user is authenticated.
 * It uses `authenticateToken` and adds additional checks if needed.
 */
export declare const checkAuth: (req: Request, res: Response, next: NextFunction) => void;
