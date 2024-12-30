// src/types/index.ts

export interface UserPayload {
  id: string;          // Required: User ID
  email: string;       // Required: Email (string)
  username?: string;   // Optional: Username (string or undefined)
  role?: string;       // Optional: Role (string)
  tier?: string;       // Optional: Subscription tier (string)
}
