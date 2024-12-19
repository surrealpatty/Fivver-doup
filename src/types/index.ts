// src/types/index.ts
import { Request } from 'express';  // Importing express types

// Define the CustomAuthRequest interface that extends Express's Request type
export interface CustomAuthRequest extends Request {
  user?: {  // Optional user property, as it will be set after authentication
    id: string;
    username: string;
    email: string;
    tier?: 'free' | 'paid';  // Optional tier property for user level
    role?: 'admin' | 'user';  // Optional role for user (admin/user)
  };
}
