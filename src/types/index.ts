import { Request } from 'express';  // Import Request from express
import { UserPayload } from './user';  // Assuming UserPayload is defined in 'user.ts'

// Extend the Request interface to include an optional 'user' property
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

// Re-export the `UserPayload` interface so it can be used elsewhere
export { UserPayload };  // Re-exporting UserPayload from 'user.ts'
