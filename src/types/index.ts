// src/types/index.ts

export interface UserPayload {
  id: string;
  email?: string;  // Optional field
  username?: string;  // Optional field
  role?: string;  // Optional, if you're using roles
  tier?: string;  // Optional, if you're using user tiers
}
