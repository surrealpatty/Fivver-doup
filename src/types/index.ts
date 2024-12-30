import { Request } from 'express';

export interface CustomAuthRequest extends Request {
  user?: { 
    id: string; 
    email?: string; // Optional to reflect middleware behavior
    username?: string; // Optional to reflect middleware behavior
  };
}
