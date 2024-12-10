// src/types/index.ts

export interface UserPayload {
  id: string;
  email: string;
  username: string;
  tier: "free" | "paid";
  role: string;  // Ensure that 'role' is defined here
}
