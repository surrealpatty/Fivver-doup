// src/types/index.ts
import { Request } from 'express';

// Define and export the `CustomAuthRequest` interface
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid';  // Ensure 'tier' is defined as a required property
  role?: 'user' | 'admin';
}
// Ensure `UserPayload` is exported too (if necessary)
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid';  // Ensure 'tier' is part of the interface
  role?: 'user' | 'admin';
}
