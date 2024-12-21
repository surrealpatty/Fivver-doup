import { Request } from 'express';

// Define the UserPayload interface (for authenticated user details)
export interface UserPayload {
  id: string;             // User ID
  email: string;          // Email address of the user (no longer optional)
  username: string;       // Username of the user (no longer optional)
  tier: 'free' | 'paid';  // Tier (either 'free' or 'paid')
  role?: 'admin' | 'user'; // Optional role
}

// Define the LocalUserPayload interface (for local user details)
export interface LocalUserPayload {
  id: string;               // User ID
  email: string;            // Email (required)
  tier: 'free' | 'paid';    // Tier (e.g., 'free' or 'paid')
  role?: 'admin' | 'user';  // Role (optional)
  username: string;         // Username (required)
  orderId?: string;         // Optional order ID
  serviceId?: string;       // Optional service ID
  amount?: number;          // Optional amount for the order
  status?: string;          // Optional status for the order
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

// Define the AuthRequest interface (extends the basic Request interface with an optional user property)
export interface AuthRequest extends Request {
  user?: UserPayload; // Adjust if needed
}

// Define the CustomAuthRequest interface (extends the Request interface with a mandatory user property)
export interface CustomAuthRequest extends Request {
  user: UserPayload;        // Ensure 'user' is always of type UserPayload (no longer optional)
}

// Type guard to check if the user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string' && typeof user.email === 'string' && typeof user.username === 'string';
}
