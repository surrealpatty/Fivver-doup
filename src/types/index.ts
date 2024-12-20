// src/types/index.ts
import { Request } from 'express';

// Define the UserPayload interface
export interface UserPayload {
  id: string;
  email: string;
  username?: string;
  tier: 'free' | 'paid';
  role?: 'admin' | 'user';
}

// Define the OrderPayload interface
export interface OrderPayload {
  item: string;         // Item in the order
  quantity: number;     // Quantity of the item
  price: number;        // Price per item
}

// Define the Order interface
export interface Order {
  id: string;           // Order ID
  orderId: string;      // A unique reference ID for the order (can be used for updates or references)
  userId: string;       // User who placed the order
  serviceId: string;    // Service related to the order
  status: string;       // Status of the order (e.g., 'pending', 'completed')
  amount: number;       // Total amount for the order (price * quantity)
  createdAt: Date;      // Creation date of the order
  updatedAt: Date;      // Last update date of the order
  price: number;        // Price of the order
}

// Define the LocalUserPayload interface
export interface LocalUserPayload {
  id: string;
  email: string;
  tier: 'free' | 'paid';
  role?: 'admin' | 'user';
  orderId?: string;
  userId?: string;
  serviceId?: string;
  amount?: number;
  status?: string;
  username: string;
}

// Define the AuthRequest interface (user is optional)
export interface AuthRequest extends Request {
  user?: UserPayload;
}

// Define the CustomAuthRequest interface (user is required)
export interface CustomAuthRequest extends Request {
  user: UserPayload;
}

// Type guard to check if the user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Ensure 'user.id' is a string
}
