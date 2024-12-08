export interface UserPayload {
  id: string;       // Unique identifier for the user
  email?: string;   // Optional property for email
  username?: string; // Optional property for username
  tier?: string;    // Optional property for the user's subscription tier
}
