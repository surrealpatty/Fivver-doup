export interface UserPayload {
  id: string;            // User ID, should be a string
  username: string;      // Username is required (no longer optional)
  email?: string;        // Email is optional (can be undefined)
  tier: 'free' | 'paid'; // Tier can only be 'free' or 'paid'
  [key: string]: any;    // Optional: Allow additional properties for future expansion
}
