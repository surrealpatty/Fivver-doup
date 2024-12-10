// src/types/index.ts
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    username: string;
    tier: 'free' | 'paid';  // Correct type for tier (should be 'free' | 'paid')
  };
}

export interface UserPayload {
  id: string;
  email: string;
  username?: string;
  tier: "free" | "paid";
}
