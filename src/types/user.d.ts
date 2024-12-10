// src/types/user.ts

export interface UserPayload {
  id: string;
  email?: string;    // Optional email (can be undefined)
  username?: string; // Optional username (can be undefined)
  tier?: string;     // Optional tier (can be undefined)
}
