// src/types/index.ts

import { Request } from 'express';

// Define the OrderPayload interface
export interface OrderPayload {
  item: string;         // Item being ordered
  quantity: number;     // Quantity of the item
  price: number;        // Price of the item
}

// Define the Order interface
export interface Order {
  id: string;           // Order ID
  userId: string;       // ID of the user who placed the order
  item: string;         // Item being ordered
  quantity: number;     // Quantity of the item
  price: number;        // Price of the item
  status: 'pending' | 'completed';  // Status of the order (pending, completed)
  createdAt?: string;   // Optional created date
  serviceId: string;    // Service ID related to the order
  amount: number;       // Amount of the order (price * quantity)
}

// Define the UserPayload interface
export interface UserPayload {
  id: string;           // User ID
  email: string;        // User email (required)
  username?: string;    // User username (optional)
  tier: 'free' | 'paid'; // User tier (free or paid)
  role?: 'admin' | 'user'; // User role (optional)
  orderId?: string;     // Associated order ID (optional)
  userId: string;       // Associated user ID (optional)
  serviceId: string;    // Associated service ID
  amount: number;       // Amount in the order
  status: string;       // Status of the order (required)
}

// Define the AuthRequest interface
export interface AuthRequest extends Request {
  user?: UserPayload;   // Optional user field (user may not exist on every request)
}

// Define the CustomAuthRequest interface with required user field
export interface CustomAuthRequest extends Request {
  user: UserPayload;    // user is now required and must follow the UserPayload type
}

// Type guard to check if the user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Ensure 'user.id' is a string
}
