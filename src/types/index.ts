// src/types/index.ts
import { UserPayload } from '../UserPayload';  // Adjust based on your file structure

// Ensure that the UserPayload interface has a non-optional email property
export interface UserPayload {
  id: string;
  email: string;  // Make sure email is always a string
  username?: string;
}
export interface OrderPayload {
  item: string;
  quantity: number;
  price: number;
}
export interface Order {
  id: string;
  item: string;
  quantity: number;
  price: number;
  // Include any other fields you expect an order to have
}
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user field (user may not exist on every request)
}

export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // Add `user` field
}
// Type guard to check if the user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Ensure 'user.id' is a string
}
