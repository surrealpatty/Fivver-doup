// src/types/index.ts

export interface UserPayload {
  id: string;
  email: string;      // Ensure email is required
  username: string;   // Ensure username is required
}

export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user property of type UserPayload
}
