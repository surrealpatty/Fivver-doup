// src/types/index.ts

export interface UserPayload {
  id: string;
  email: string;         // Make email required
  username: string;      // Make username required
  role: string;          // Make role required
  tier: "free" | "paid"; // Make tier required
}
