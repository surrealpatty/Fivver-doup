import { Request } from 'express';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    username: string;
    tier: 'free' | 'paid';  // Ensure tier is correctly typed
  };
}
