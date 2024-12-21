// src/types/index.ts

import { Request } from 'express'; // Import Request from 'express'

// Define and export UserPayload with required fields
export interface UserPayload {
    id: string;
    email: string;  // email should be mandatory
    username: string;
    tier: "free" | "paid";  // Ensure tier is either "free" or "paid"
}
export interface AuthRequest extends Request {
    user?: UserPayload;
}
// Define and export CustomAuthRequest that extends the base Request
export interface CustomAuthRequest extends Request {
    user?: UserPayload; // user can be undefined, hence optional
}
export interface CustomAuthRequest extends Request {
    user?: UserPayload;  // Make sure it's optional and matches the UserPayload structure
}