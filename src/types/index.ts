import { Request } from 'express';
import { UserPayload } from './UserPayload';  // Assume you have a UserPayload defined elsewhere

// Ensure that the UserPayload interface has a non-optional email property
export interface UserPayload {
  id: string;
  email: string; // Make sure email is required
  username?: string;
  tier: 'free' | 'paid';
  role?: 'admin' | 'user';
  orderId: string;
  userId: string;
  serviceId: string;
  amount: number;
  status: string;
  
}

// OrderPayload and Order interfaces for order-related data
export interface OrderPayload {
  id: string;       // Order ID
  userId: string;   // ID of the user who placed the order
  item: string;     // Item being ordered
  quantity: number; // Quantity of the item
  price: number;    // Price of the item
  // Add any other fields specific to OrderPayload as needed
}

export interface Order {
  id: string;       // Order ID
  userId: string;   // ID of the user who placed the order
  item: string;     // Item being ordered
  quantity: number; // Quantity of the item
  price: number;    // Price of the item
  status?: string;  // Optional status field (e.g., 'pending', 'completed')
  createdAt?: string;  // Optional created date
  serviceId: string;
  amount: number;
}

// Ensure that the AuthRequest extends the Request object correctly
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user field (user may not exist on every request)
}

// Corrected CustomAuthRequest to reflect UserPayload properly
export interface CustomAuthRequest extends Request {
  user: UserPayload;  // user is now required and must follow the UserPayload type
}

// Type guard to check if the user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Ensure 'user.id' is a string
}

// Export interfaces for use in other files
export { UserPayload, OrderPayload, Order, CustomAuthRequest };
