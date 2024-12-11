// src/types.ts

import { Request } from 'express';  // Import Express' Request type

export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid';
  role?: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;  // This extends the Request type and adds the user property
}

export interface CreateOrderRequest {
  serviceId: string;
  quantity: number;
  price: number;
}
