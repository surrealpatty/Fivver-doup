// src/types/index.ts
export interface UserPayload {
  id: string;
  email: string;
  username: string;
  tier: 'free' | 'paid';  // Correctly type tier as a literal type
  [key: string]: any;  // Optional: Include additional properties as needed
}
