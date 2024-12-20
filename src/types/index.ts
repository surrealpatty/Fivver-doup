import { Request } from 'express';

// Define UserPayload interface
export interface UserPayload {
  tier: 'free' | 'paid'; // Required: User's subscription tier (restricted to 'free' or 'paid')
  role?: 'admin' | 'user'; // Optional: User's role (either 'admin' or 'user')
  orderId: string;
  userId: string;
  serviceId: string;
  amount: number;
  status: string;
  id: string;
  email: string;  // Make sure email is required
  username: string;
}
export interface OrderPayload {
  id: string;
  totalAmount: number;
  status: string;
  // Add other fields as required
}

// Define AuthRequest interface to extend Express' Request with an optional user field
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user property, as not every request might have a user attached
}

// CustomAuthRequest extends AuthRequest for any specific customizations
export interface CustomAuthRequest extends Request {
  user?: {
    id: string;
    email?: string;
    username?: string;
    tier?: string;
  };
}

// Type guard to check if a user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Ensure 'user.id' is a string
}
