// src/models/user.ts

export interface UserPayload {
  id: string;          // Assuming the user has a unique ID
  email?: string;      // Optional email field
  username?: string;   // Optional username field
  tier: "free" | "paid";  // Tier of the user
}
