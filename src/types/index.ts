import { Request } from 'express';
import { UserPayload } from './user';  // Import UserPayload from './user'

// Rename the local UserPayload interface to avoid naming conflict
export interface OrderPayload {
  id: string;
  serviceId: string;
  userId: string;
  price: number;
  status: string; // Example field
  // Add other fields as necessary
}

// Define the Order interface
export interface Order {
  id: string;          // Order ID
  orderId: string;     // Order ID (to be used in case of updates or references)
  userId: string;      // ID of the user who placed the order
  serviceId: string;   // Service ID related to the order
  status: string;      // Status of the order (e.g., 'pending', 'completed')
  amount: number;      // Amount of the order
  createdAt: Date;     // Date the order was created
  updatedAt: Date;
  price: number; 
}

// Rename the local interface to avoid the conflict with the imported UserPayload
export interface LocalUserPayload {
  id: string;           // User ID
  email: string;        // User email (required)
  tier: 'free' | 'paid'; // User tier (free or paid)
  role?: 'admin' | 'user'; // User role (optional)
  orderId?: string;     // Associated order ID (optional) <-- Added orderId to UserPayload
  userId?: string;      // Associated user ID (optional)
  serviceId?: string;   // Associated service ID (optional)
  amount?: number;      // Amount in the order (optional)
  status?: string;      // Status of the order (optional)
  username: string; 
}

// Define the AuthRequest interface (user is optional)
export interface AuthRequest extends Request {
  user?: UserPayload;   // Optional user field (user may not exist on every request)
}

// Define the CustomAuthRequest interface (user is required)
export interface CustomAuthRequest extends Request {
  user: UserPayload;    // user is now required and must follow the UserPayload type
}

// Type guard to check if the user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Ensure 'user.id' is a string
}
