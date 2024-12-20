// src/types/UserPayload.ts

export interface UserPayload {
  id: string;
  email: string;  // Make sure email is always required
  username?: string;
  tier: 'free' | 'paid'; 
  role?: 'admin' | 'user';
  orderId: string;
  userId: string;
  serviceId: string;
  amount: number;
  status: string;
}
