// src/types/customAuthRequest.ts
import { Request } from 'express';

export interface CustomAuthRequest extends Request {
  user?: {
    id: string;
    email: string;  // Make email required
    username?: string;
  };
}
