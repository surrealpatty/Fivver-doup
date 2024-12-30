import { Request } from 'express';

// Extend the Request interface to include additional properties like `user`
export interface CustomAuthRequest extends Request {
    user?: {
        id: string;
        email?: string;
        username?: string;
    }; // Add any additional properties you need
}
