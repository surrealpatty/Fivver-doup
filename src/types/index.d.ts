// Define UserPayload if not already defined
export interface UserPayload {
  id: string;
  email?: string;  // Make email optional
  username?: string;
  tier: 'free' | 'paid'; // Assuming tier is required
  role?: 'admin' | 'user'; // Assuming role is optional
}

// Define OrderPayload
export interface OrderPayload {
  id: string;
  userId: string;
  serviceId: string;
  quantity: number;
  totalPrice: number;
  status: string;
}

// Define CustomAuthRequest for extending Express Request
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // `user` is optional
}
