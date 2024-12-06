// src/types/index.ts

export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload; // The 'user' object is optional, matching the UserPayload structure
}
