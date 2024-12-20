import { Request } from 'express';

// Define the UserPayload interface
export interface UserPayload {
  id: string;               // User ID
  email: string;            // Email is required and a non-nullable string
  username: string;         // Username is a required string
  tier: 'free' | 'paid';    // Tier (e.g., 'free' or 'paid')
  role?: 'admin' | 'user';  // Role (optional, can be either 'admin' or 'user')
}

// Define the OrderPayload interface
export interface OrderPayload {
  item: string;             // Item in the order
  quantity: number;         // Quantity of the item
  price: number;            // Price per item
}

// Define the Order interface
export interface Order {
  id: string;               // Order ID
  orderId: string;          // A unique reference ID for the order (can be used for updates or references)
  userId: string;           // User who placed the order
  serviceId: string;        // Service related to the order
  status: string;           // Status of the order (e.g., 'pending', 'completed')
  amount: number;           // Total amount for the order (price * quantity)
  createdAt: Date;          // Creation date of the order
  updatedAt: Date;          // Last update date of the order
  price: number;            // Price of the order
}

// Define the LocalUserPayload interface
export interface LocalUserPayload {
  id: string;               // User ID
  email: string;            // Email (required)
  tier: 'free' | 'paid';    // Tier (e.g., 'free' or 'paid')
  role?: 'admin' | 'user';  // Role (optional)
  orderId?: string;         // Optional order ID
  userId?: string;          // Optional user ID
  serviceId?: string;       // Optional service ID
  amount?: number;          // Optional amount for the order
  status?: string;          // Optional status for the order
  username: string;         // Username (required)
}

// Define the AuthRequest interface (user is optional)
export interface AuthRequest extends Request {
  user?: UserPayload;       // 'user' is optional in AuthRequest
}

// Define the CustomAuthRequest interface (user is required)
export interface CustomAuthRequest extends Request {
  user: UserPayload;        // 'user' is required in CustomAuthRequest
}

// Type guard to check if the user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string' && typeof user.email === 'string';  // Ensure 'user.id' and 'user.email' are strings
}
