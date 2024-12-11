// src/types/user.ts
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: string;  // Ensure tier is part of UserPayload
  role?: string;  // Optional, if you want to include roles in the future
}
