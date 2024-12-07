// src/types/index.ts
export interface UserPayload {
  id: string;           // Required
  email?: string;       // Optional
  username?: string;    // Optional
  tier?: string;        // Optional (if relevant to your use case)
}
