// src/types/index.ts

// Export necessary types
export * from './UserPayload';  // Assuming UserPayload.ts exists with correct filename
export * from './Order';        // Ensure Order.ts exists with correct filename (case-sensitive)
export * from './OrderPayload'; // Ensure OrderPayload.ts exists with correct filename (case-sensitive)

// Import necessary types from specific files
import { Request } from 'express';

// Define the Order interface if it's not already defined in the Order.ts file
export interface Order {
  id: string;         // Order ID
  userId: string;     // ID of the user who placed the order
  item: string;       // Item being ordered
  quantity: number;   // Quantity of the item
  price: number;      // Price of the item
  status?: string;    // Optional status field (e.g., 'pending', 'completed')
  createdAt?: string; // Optional created date
  serviceId: string;  // Service ID related to the order
  amount: number;     // Amount of the order
}

// Ensure UserPayload interface is imported correctly from UserPayload.ts
export interface UserPayload {
  id: string;
  email: string;      // Ensure email is required
  username?: string;  // Optional, assuming it's not required
  tier: 'free' | 'paid';  // Define the tier (free/paid)
  role?: 'admin' | 'user'; // Optional, defining roles
  orderId?: string;        // Associated order ID
  userId: string;         // Associated user ID
  serviceId: string;      // Associated service ID
  amount: number;         // Amount in the order
  status: string;         // Status of the order
}

// OrderPayload interface should be defined in OrderPayload.ts, which should be exported here
export interface OrderPayload {
  id: string;
  userId: string;
  item: string;
  quantity: number;
  price: number;
  // Add any other fields as needed
}

// AuthRequest and CustomAuthRequest types
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user field (user may not exist on every request)
}

export interface CustomAuthRequest extends Request {
  user: UserPayload;  // user is now required and must follow the UserPayload type
}

// Type guard to check if the user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Ensure 'user.id' is a string
}
