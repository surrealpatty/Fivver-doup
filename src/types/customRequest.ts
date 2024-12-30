// src/types/customRequest.ts
import { Request } from 'express';

export interface CustomAuthRequest extends Request {
  user: { 
    id: string; 
    email: string; // email is now non-optional
    username: string; // username is now non-optional
  };
}
