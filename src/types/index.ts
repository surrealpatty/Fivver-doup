// src/types/index.ts
import { Request } from 'express';

// CustomAuthRequest extends the Express Request object to include user information
export interface CustomAuthRequest extends Request {
  user?: UserPayload; 
    id: string;
    email?: string; // Optional email
    username?: string; // Optional username
    tier?: 'free' | 'paid'; // Make tier optional
  };


  export interface UserPayload {
    id: string;
    email?: string;
    username?: string;
    tier: "free" | "paid";
    role?: "admin" | "user"; // Add role to the UserPayload interface
}
  
