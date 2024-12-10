import { Request } from 'express';  // Import Request interface from Express

// src/types/index.ts

export interface UserPayload {
  id: string;
  email: string;
  username?: string;
  tier: "free" | "paid";  // Ensure 'tier' is included
  role?: string;  // Optionally include role if needed
}


export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user field, which can include 'tier'
}

export interface CustomAuthRequest extends Request {
  user: UserPayload;  // Required user field, must include 'tier'
}
