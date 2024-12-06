// src/types/index.ts

export interface UserPayload {
  id: string;
  email?: string;  // Make email optional
  username?: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload; // `user` property can optionally be present with `UserPayload`
}
