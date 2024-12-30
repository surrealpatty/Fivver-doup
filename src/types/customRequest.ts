// src/types/customRequest.ts
import { UserPayload } from './index'; // Adjust the import path if necessary
import { Request } from 'express';

export interface CustomAuthRequest extends Request {
  user: { 
    id: string; 
    email: string; // email is now non-optional
    username: string; // username is now non-optional
  };
}
