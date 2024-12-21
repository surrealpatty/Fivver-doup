// src/types/index.ts

import { Request } from 'express'; // Import Request from 'express'

// Define and export UserPayload with required fields
export interface UserPayload {
    id: string;
    email?: string;  // email should be mandatory
    username?: string;
    tier: "free" | "paid";  // Ensure tier is either "free" or "paid"
}
export interface AuthRequest extends Request {
    user?: UserPayload;
}
export interface CustomAuthRequest extends Request {
    user?: UserPayload; // Ensure user is of type UserPayload
}