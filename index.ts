// src/types/index.ts
import { Request } from 'express';

export interface CustomAuthRequest extends Request {
  user: {
    id: string;
    email: string;
    username: string;
  }; // No optional or null allowed, ensuring `user` is always present
}
