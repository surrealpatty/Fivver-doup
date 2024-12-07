// src/types/index.ts
export interface UserPayload {
  id: string;
  email?: string;  // Make email optional
  username?: string;
  tier?: string;   // Optional field for tier
}
