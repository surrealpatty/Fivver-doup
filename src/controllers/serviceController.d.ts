import { Request, Response } from 'express';
import { UserPayload } from '../types';
interface AuthRequest extends Request {
    user?: UserPayload;
}
/**
 * Get the service profile for the authenticated user.
 * @param req - Request object, including user information from JWT.
 * @param res - Response object.
 * @returns The service data or an error message.
 */
export declare const getServiceProfile: (req: AuthRequest, res: Response) => Promise<Response>;
export {};
