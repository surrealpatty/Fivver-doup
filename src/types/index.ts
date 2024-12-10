import { Request } from 'express';
import { UserPayload } from '../models/user'; 


export interface UserPayload {
  id: string;
  email: string;  // email is required
  username?: string;  // username is optional
  tier: "free" | "paid";  // 'tier' is required
  role?: string;  // Optional if needed
}

export interface AuthRequest extends Request {
  user?: UserPayload;  // `user` can be optional if not guaranteed to be set
}

export interface CustomAuthRequest extends Request {
  user: UserPayload;  // Required user field, must include 'tier'
}
