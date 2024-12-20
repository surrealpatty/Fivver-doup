import { Request } from 'express';

// Define the UserPayload interface (for authenticated user details)
export interface UserPayload {
  id: string;             // User ID
  email: string;          // Email address of the user
  username: string;       // Username of the user
  tier: 'free' | 'paid';  // Tier (either 'free' or 'paid')
}

// Define the OrderPayload interface (for creating orders)
export interface OrderPayload {
  item: string;             // Item name in the order
  quantity: number;         // Quantity of the item
  price: number;            // Price per item
}

// Define the Order interface (for the full order details)
export interface Order {
  id: string;               // Order ID
  orderId: string;          // A unique reference ID for the order (can be used for updates or references)
  userId: string;           // User who placed the order
  serviceId: string;        // Service related to the order
  item: string;             // Item name (from OrderPayload)
  quantity: number;         // Quantity of the item (from OrderPayload)
  price: number;            // Price of the item (from OrderPayload)
  status: string;           // Status of the order (e.g., 'pending', 'completed')
  amount: number;           // Total amount for the order (price * quantity)
  createdAt: Date;          // Creation date of the order
  updatedAt: Date;          // Last update date of the order
}

// Define the LocalUserPayload interface (for local user details)
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

// Define the AuthRequest interface (extends the basic Request interface with an optional user property)
export interface AuthRequest extends Request {
  user?: UserPayload;       // 'user' is optional in AuthRequest (contains user details if authenticated)
}

// Define the CustomAuthRequest interface (extends the Request interface with an optional user property)
export interface CustomAuthRequest extends Request {
  user?: UserPayload;       // 'user' is optional in CustomAuthRequest (contains user details if authenticated)
}

// Type guard to check if the user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string' && typeof user.email === 'string';  // Ensure 'user.id' and 'user.email' are strings
}
