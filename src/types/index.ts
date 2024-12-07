// src/types/index.ts
export interface UserPayload {
  id: string;
  email?: string;  // Make email optional
  username?: string;
}

export interface AuthRequest extends Request {
  user: UserPayload;  // Define AuthRequest if it's needed for type safety
}
