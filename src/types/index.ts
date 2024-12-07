// src/types/index.ts
export interface UserPayload {
  id: string;
  email: string;
  username: string;
  tier?: string;  // Make tier optional or required based on your logic
}
