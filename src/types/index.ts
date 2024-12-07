// src/types/index.ts
export interface UserPayload {
  id: string;       // Required
  email?: string;   // Optional, matching Express's expected type
  username?: string; // Optional
}
