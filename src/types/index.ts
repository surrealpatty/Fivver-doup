// src/types/index.ts
export interface UserPayload {
  id: string;
  email: string | undefined;  // Allow email to be string or undefined
  username: string;
  tier: 'free' | 'paid';
  [key: string]: any;  // Optional: Additional properties can be added
}
