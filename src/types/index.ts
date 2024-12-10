// src/types/index.ts
import { Request } from 'express';  // Import Request from express

export interface UserPayload {
  id: string;
  email: string;
  username: string;
  role: string;  // Keep role as string if you plan on having other roles
  tier: 'free' | 'paid';  // Restrict tier to either 'free' or 'paid'
}

export interface AuthRequest extends Request {
  user: UserPayload;  // Ensure 'user' includes 'role' and 'tier'
}
