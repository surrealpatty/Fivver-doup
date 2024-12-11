// src/types/index.ts
import { Request } from 'express';  // Import Request from express
import { UserPayload } from './user';  // Assuming UserPayload is defined in 'user.ts'

// Extend the Request interface to include the `user` property, which is optional and of type `UserPayload`
export interface AuthRequest extends Request {
  user?: UserPayload;  // Allow 'user' to be undefined
}

// Type guard to check if a user is of type UserPayload
export function isUserPayload(user: any): user is UserPayload {
  return user && typeof user.id === 'string' && typeof user.tier === 'string';
}

// Define the request body type for creating an order
export interface CreateOrderRequest {
  userId: number;
  serviceId: number;
  orderDetails: string;
  status: string;
}

// Export the `UserPayload` interface to be used in other files
export { UserPayload } from './user';  // Exporting UserPayload from 'user.ts'
