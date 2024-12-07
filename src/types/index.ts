// src/types/index.ts
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  role?: string;
  tier?: string; // Add any additional properties needed
}
