// src/types/index.ts
import { Request } from 'express';  // Import Request from express
import { UserPayload } from './user';  // Assuming UserPayload is defined in 'user.ts'

// Extend the Request interface to include the `user` property, which is optional and of type `UserPayload`
export interface AuthRequest extends Request {
  user?: UserPayload; // Marking user as optional
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

// Export the `UserPayload` interface to be used in other files
export { UserPayload } from './user';  // Exporting UserPayload from 'user.ts'
