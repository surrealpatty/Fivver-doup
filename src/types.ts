// src/types.ts
import { Request } from 'express';

// User payload interface
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  role?: string;
  tier?: string;
}

// AuthRequest extends Express' Request with an optional user field
export interface AuthRequest extends Request {
  user?: UserPayload;
}
