// src/types/index.ts
export interface UserPayload {
  id: string;
  email: string;  // Now required
  username?: string;
  tier?: string;
}
