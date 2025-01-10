import { Request } from 'express';
import { UserPayload } from './index'; // Ensure this is the correct path

// CustomAuthRequest type extending Express's Request
export interface CustomAuthRequest extends Request {
    user?: UserPayload; // Optional user field
}
