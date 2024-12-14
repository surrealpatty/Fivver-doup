// src/types/index.ts

import { Request } from 'express';  // Import Request from express
import { UserPayload } from './user';  // Import UserPayload from src/types/user.ts (ensure the path is correct)

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
