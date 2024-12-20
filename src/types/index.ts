export interface UserPayload {
  id: string;
  email?: string; // Make email optional
  username?: string;
  tier: 'free' | 'paid'; // Assuming tier is required
  role?: 'admin' | 'user'; // Assuming role is optional
}

export interface CustomAuthRequest extends Request {
  user?: UserPayload; // `user` is optional
}
