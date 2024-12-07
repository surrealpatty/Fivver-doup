// src/types/index.ts
export interface UserPayload {
  id: string;
  email: string;
  username: string;  // Make username required to avoid conflict
  tier?: string;
  role?: string;
}
