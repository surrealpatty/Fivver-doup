// src/types/index.ts
import { Request } from 'express';

// Custom request interface to include optional user information
export interface CustomAuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    username: string;
    tier?: string; // Optional tier field (could be 'free', 'paid', etc.)
  };
}

// Interface for the decoded JWT payload
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
}
