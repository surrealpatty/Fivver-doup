import { Request } from 'express';

// Define UserPayload interface
export interface UserPayload {
  id: string;               // Required: User ID
  email?: string;           // Optional: Email of the user
  username?: string;        // Optional: Username of the user
  tier: 'free' | 'paid';    // Required: User's subscription tier
  role?: 'admin' | 'user';  // Optional: User's role (admin or user)
}

// Define OrderPayload interface
export interface OrderPayload {
  id: string;        // Required: Order ID
  userId: string;    // Required: User ID associated with the order
  serviceId: string; // Required: ID of the service for the order
  quantity: number;  // Required: Quantity of the service ordered
  totalPrice: number; // Required: Total price of the order
  status: string;    // Required: Status of the order (e.g., 'pending', 'completed')
}

// Define CustomAuthRequest interface for extending Express Request
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // Optional: `user` is of type `UserPayload` or undefined
}
