import { Request } from 'express';

// Define the UserPayload interface
export interface UserPayload {
  id: string;  // User's unique identifier
  email?: string;  // Optional email
  username?: string;  // Optional username
  tier?: 'free' | 'paid';  // User's subscription tier, optional
}

// Extend the Express Request interface to include the optional 'user' field
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // The 'user' field is optional and will be added to the req object in authenticateToken
}

// Helper type guard to check if the `user` field exists
export function isUser(req: CustomAuthRequest): req is CustomAuthRequest & { user: UserPayload } {
  return !!req.user;
}

// Define the request body type for creating an order (example use case)
export interface CreateOrderRequest {
  userId: number;
  serviceId: number;
  orderDetails: string;
  status: string;
}
