// src/types/index.ts
export interface UserPayload {
  id: string;
  email: string;  // Make email required if following Solution A
  username?: string;
  tier?: string;  // Add the tier property if it's part of the JWT payload
}
