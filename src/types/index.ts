// src/types/index.ts
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier?: string;
}

export interface AuthRequest {
  user: UserPayload;
}
