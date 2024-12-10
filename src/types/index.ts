export interface UserPayload {
  id: string;
  email: string | undefined;  // Email can be either string or undefined
  username: string;
  tier: 'free' | 'paid';      // Ensures tier is either 'free' or 'paid'
  [key: string]: any;         // Optional: Allow additional properties in the future
}
