// Import Request from express
import { Request } from 'express';

// Define the UserPayload interface (avoid conflicts by defining it here)
export interface UserPayload {
  id: string;
  email: string; // Made required
  username: string; // Made required
}

// Extend the Express Request interface to include the optional 'user' field
export interface AuthRequest extends Request {
  user?: UserPayload; // The 'user' field is optional and will be added to the req object in authenticateToken
}

// Helper type guard to check if the `user` field exists
export function isUser(req: AuthRequest): req is AuthRequest & { user: UserPayload } {
  return !!req.user;
}

// Define the request body type for creating an order
export interface CreateOrderRequest {
  userId: number;
  serviceId: number;
  orderDetails: string;
  status: string;
}
