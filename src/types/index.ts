// src/types/index.ts

export interface UserPayload {
  id: string;
  email: string;  // Making email a required field
  username?: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload; // `user` property can optionally be present with `UserPayload`
}
