// src/types.ts

// Declare the UserPayload interface, which can be imported across the project
export interface UserPayload {
  id: string;
  email?: string;  // Optional email field
  username?: string;  // Optional username field
  tier: 'free' | 'paid';  // Enum-like field for user tier
  [key: string]: any;  // Allow for additional properties if necessary
}
