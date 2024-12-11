// src/types/authMiddleware.ts

import { Request } from 'express';
import { UserPayload } from './index';

export interface AuthRequest extends Request {
  user?: {  // user is optionally available
    id: string;
    email?: string;
    username?: string;
    tier: 'free' | 'paid';  // Ensure tier is always present
  };
}
