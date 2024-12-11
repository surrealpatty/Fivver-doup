// src/types/index.ts

import { Request } from 'express';  // Import Request from express
import  UserPayload  from './user';  // Assuming UserPayload is defined in 'user.ts'

export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;  // User can be undefined
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

