// src/types/index.ts

import { Request } from 'express'; // Import Request from 'express'

// Define and export UserPayload with required fields
export interface UserPayload {
    id: string;
    email: string; // Make email required
    username?: string;
}

// Define and export CustomAuthRequest that extends the base Request
export interface CustomAuthRequest extends Request {
    user?: UserPayload; // user can be undefined, hence optional
}
