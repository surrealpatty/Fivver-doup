import { Request } from 'express';
import { UserPayload } from './user';  // Assuming UserPayload is in 'user.ts'

// Extend the Request interface to include the user property of type UserPayload
export interface AuthRequest extends Request {
  user?: UserPayload;  // Ensure `user` is of type UserPayload, including 'tier'
}

// Type guard to check if a user is of type UserPayload
export function isUserPayload(user: any): user is UserPayload {
  return user && typeof user.id === 'string' && typeof user.tier === 'string';
}

// Define the request body type for creating an order (for order creation)
export interface CreateOrderRequest {
  userId: number;
  serviceId: number;
  orderDetails: string;
  status: string;
}

// Export UserPayload for use in other files
export { UserPayload } from './user';  // Exporting UserPayload from 'user.ts'
