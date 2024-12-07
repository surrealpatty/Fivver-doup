// src/types/index.ts
export interface UserPayload {
  id: string;
  email: string;
  username?: string;
  tier?: string;
  role?: string;  // Add the 'role' property
}
