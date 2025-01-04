// src/types/index.ts

// Define roles and tiers as needed
export type UserRole = 'admin' | 'paid' | 'user'; // You can extend this with more roles
export type UserTier = 'free' | 'paid'; // You can extend this with more tiers

// Define the user payload structure
export interface UserPayload {
  id: string;        // Unique identifier for the user
  email?: string;     // User's email
  username?: string;  // Optional username
  role?: UserRole;    // Role of the user, can be 'admin', 'paid', 'user'
  tier?: UserTier;    // Tier of the user, can be 'free', 'paid'
  isPaid?: boolean;   // Add the 'isPaid' property to indicate if the user is a paid user
}

// Import Request from express to extend it
import { Request } from 'express';

// Extend the Request type to include the `user` property
export interface CustomAuthRequest extends Request {
  user?: UserPayload; // Optional user property in the request
}
