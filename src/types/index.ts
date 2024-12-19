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
    email: string;  // Ensure this is consistently a string
    username: string;
    tier: "free" | "paid" | undefined;  // Ensure this is typed correctly
  }
  
