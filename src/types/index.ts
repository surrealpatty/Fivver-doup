// src/types/index.ts
import { Request } from 'express';  // Import Request type from express

export interface UserPayload {
    id: string;        // ID is required
    email?: string;    // Email is optional
    username?: string; // Username is optional
    tier: string;      // Tier is required (set to 'free' or 'paid')
  }
  
  export interface CustomAuthRequest extends Request {
    user?: UserPayload;  // Define the user property if it's available
  }