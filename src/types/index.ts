// src/types/index.ts

// UserPayload interface definition
export interface UserPayload {
  id: string;  // Required: ID of the user
  email?: string;  // Optional: email can be omitted
  username?: string;  // Optional: username can be omitted
  tier?: string;  // Optional: tier property to define user tier (e.g., 'free' or 'paid')
}
