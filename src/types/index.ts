// src/types/index.ts
export interface UserPayload {
  id: string;         // User ID, should be a string
  email?: string;     // Email can be a string or undefined (optional field)
  username?: string;  // Username can be a string or undefined (optional field)
  tier: 'free' | 'paid';  // Tier can only be 'free' or 'paid'
  [key: string]: any; // Optional: Allow additional properties for future expansion
}
