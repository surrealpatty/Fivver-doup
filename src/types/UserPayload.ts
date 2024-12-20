// src/types/UserPayload.ts

export interface UserPayload {
  id: string;
  email: string;      // Email is required
  username?: string;  // Optional username
  tier: 'free' | 'paid';  // Define tier (free/paid)
  role?: 'admin' | 'user'; // Optional role
  orderId?: string;        // Associated order ID (optional)
  userId: string;         // Associated user ID
  serviceId: string;      // Associated service ID
  amount: number;         // Amount for the order
  status: string;         // Status of the order
}
export interface CustomAuthRequest extends Request {
  user?: UserPayload;
}