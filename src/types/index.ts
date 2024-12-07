// src/types/index.ts
export interface UserPayload {
  id: string;
  email: string;
  username: string;
  tier?: string;  // Optional, depending on your app's structure
}
