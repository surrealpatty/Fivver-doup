export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid';
  [key: string]: any;
}
