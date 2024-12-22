import { Request } from 'express';
import { UserPayload } from '../types'; // Ensure you import the correct type

export interface CustomAuthRequest extends Request {
    user?: UserPayload;
}
