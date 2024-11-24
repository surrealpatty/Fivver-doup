import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
interface UserPayload extends JwtPayload {
    id: string;
    email: string;
    username: string;
}
declare module 'express-serve-static-core' {
    interface Request {
        user?: UserPayload;
    }
}
export declare const authenticateToken: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | void;
export {};
