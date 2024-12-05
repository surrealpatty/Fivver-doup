import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: { 
    id: string; 
    email: string; 
    username: string; 
    tier: string; // Ensure 'tier' is included as a required field
  };
}
