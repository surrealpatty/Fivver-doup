// Import the necessary types
import { Request } from 'express';

// Define the UserPayload interface
export interface UserPayload {
  id: string;
  email: string;        // Email is required
  username?: string;    // Username is optional
  tier: 'free' | 'paid'; // User tier (free or paid)
  role?: 'admin' | 'user'; // Optional user role
}

// Define the OrderPayload interface
export interface OrderPayload {
  id: string;           // Order ID
  serviceId: string;    // Associated service ID
  userId: string;       // Associated user ID
  price: number;        // Order price
  status: string;       // Order status (e.g., 'pending', 'completed')
}

// Define the Order interface
export interface Order {
  id: string;          // Order ID
  orderId: string;     // A unique reference ID for the order (can be used for updates or references)
  userId: string;      // User who placed the order
  serviceId: string;   // Service related to the order
  status: string;      // Status of the order (e.g., 'pending', 'completed')
  amount: number;      // Amount for the order
  createdAt: Date;     // Creation date of the order
  updatedAt: Date;     // Last update date of the order
  price: number;       // Price of the order
}

// Define the LocalUserPayload interface to avoid naming conflict
export interface LocalUserPayload {
  id: string;           // User ID
  email: string;        // User email (required)
  tier: 'free' | 'paid'; // User tier (either 'free' or 'paid')
  role?: 'admin' | 'user'; // Optional user role
  orderId?: string;     // Associated order ID (optional)
  userId?: string;      // Associated user ID (optional)
  serviceId?: string;   // Associated service ID (optional)
  amount?: number;      // Associated amount (optional)
  status?: string;      // Order status (optional)
  username: string;     // Username (required)
}

// Define the AuthRequest interface (optional user field)
export interface AuthRequest extends Request {
  user?: UserPayload;   // Optional user field (user may not exist on every request)
}

// Define the CustomAuthRequest interface (required user field)
export interface CustomAuthRequest extends Request {
  user: UserPayload;    // User is now required and must follow the UserPayload type
}

// Type guard to check if the user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Ensure 'user.id' is a string
}
