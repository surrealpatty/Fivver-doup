// src/types/index.ts
export interface UserPayload {
  id: string;           // User ID, should be a string
  email?: string;       // Email is optional, but must be a string if present
  username?: string;    // Username is optional, but must be a string if present
  tier: 'free' | 'paid'; // Tier can only be 'free' or 'paid'
  [key: string]: any;   // Optional: Allow additional properties for future expansion
}
