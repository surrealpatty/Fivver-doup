// src/types/index.ts

export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;  // Allow user to be optional
}

export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';
}
