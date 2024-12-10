export interface UserPayload {
  id: string;         // User ID, should be a string
  username: string;   // Make username a required field (no longer optional)
  email?: string;     // Email is optional
  tier: 'free' | 'paid';  // Tier can only be 'free' or 'paid'
  [key: string]: any; // Optional: Allow additional properties for future expansion
}
