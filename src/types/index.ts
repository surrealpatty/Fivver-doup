// src/types/index.ts

// Import Request from express
import { Request } from 'express';
// Import UserPayload from src/types/user.ts (ensure the path is correct)
import { UserPayload } from './user';

// Extend the Express Request interface to include the optional 'user' field
export interface AuthRequest extends Request {
  user?: UserPayload;  // The 'user' field is optional and will be added to the req object in authenticateToken
}

// Helper type guard to check if user exists
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

// Re-export the UserPayload interface
export { UserPayload };
