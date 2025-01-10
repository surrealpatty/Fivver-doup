// src/types/auth.ts

import { UserPayload } from './index';  // Ensure this path is correct

// CustomAuthRequest type extending Express's Request
export interface CustomAuthRequest extends Request {
    user?: UserPayload; // Optional user field
}
