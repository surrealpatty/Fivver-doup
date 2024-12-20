export interface UserPayload {
    tier: 'free' | 'paid';  // User's subscription tier
    role?: 'admin' | 'user';  // User's role (optional)
    orderId: string;
    userId: string;
    serviceId: string;
    amount: number;
    status: string;
    id: string;
    email?: string;  // Make email optional (email is not guaranteed to exist)
    username?: string;  // Make username optional
  }
  