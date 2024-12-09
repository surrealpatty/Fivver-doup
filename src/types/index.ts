import { Request } from 'express';

export interface UserPayload {
  id: string;
  tier: 'free' | 'paid';
  [key: string]: any; // Optional: Include additional properties as needed
}

// Extend the Express Request interface to include `user`
declare module 'express-serve-static-core' {
  interface Request {
  }
}
