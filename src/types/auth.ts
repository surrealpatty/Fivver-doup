// src/types/auth.ts
import { Request } from 'express';
import { UserPayload } from './index'; // Adjust the import to match the export in your index.ts

// CustomAuthRequest type extending Express's Request
export interface CustomAuthRequest extends Request {
    user?: UserPayload; // Make `user` optional
}
