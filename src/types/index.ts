// src/types/index.ts

import { Request } from 'express'; // Import Request from 'express'

// Define and export UserPayload with required fields
export interface UserPayload {
    id: string;
    email?: string;
    username?: string;
    tier: 'free' | 'paid';  // Ensure that tier is always either 'free' or 'paid'
  }
export interface AuthRequest extends Request {
    user?: UserPayload;  // Add user field to request, typed as UserPayload
  }
// Define and export CustomAuthRequest that extends the base Request
export interface CustomAuthRequest extends Request {
    user?: UserPayload; // user can be undefined, hence optional
}
