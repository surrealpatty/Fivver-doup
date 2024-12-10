// src/types/index.ts

export interface UserPayload {
  id: string;
  email: string;
  username: string;
  role: string;  // Add 'role' here to fix the issue
  tier: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;  // Make sure 'user' includes 'role'
}
