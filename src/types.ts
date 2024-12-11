// src/types.ts

import { Request } from 'express';  // Import Express' Request type

export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid';  // Ensure tier is always present
  role?: string;
}

export interface AuthRequest extends Request {
  user: UserPayload;  // This ensures the 'user' object always has 'tier'
}

export interface CreateOrderRequest {
  serviceId: string;
  quantity: number;
  price: number;
}
