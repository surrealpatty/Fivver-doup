// src/types/index.ts

export function isUser(req: AuthRequest): req is AuthRequest & { user: UserPayload } {
  return req.user !== undefined; // Explicitly check for undefined
}

// Ensure AuthRequest and UserPayload are also exported
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier?: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;  // user can be undefined if not authenticated
}

