// src/types/user.ts
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid';  // 'tier' is required now
  role?: string;  // Optional, if you want to include roles in the future
}
