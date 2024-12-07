// src/types/index.ts
export interface UserPayload {
  id: string;
  email: string;
  username: string;
  tier?: string;  // Add tier, making it optional or required based on your use case
}
