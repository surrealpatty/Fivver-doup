// src/types/index.ts
import { Request } from 'express';

// src/types/index.ts
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: string;  // `tier` is now required
  role?: string; // Optional, if you want to include roles
}

// Define the AuthRequest interface by extending the Express Request interface
export interface AuthRequest extends Request {
  user?: UserPayload;  // Define the type for the `user` property as UserPayload
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid'; // Enum-like field for user tier
  [key: string]: any;  // Allow for additional properties if necessary
}
