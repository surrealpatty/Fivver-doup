// src/types/custom.d.ts

export interface UserPayload {
  id: string;        // The user's unique identifier
  email: string;     // Email is required, as per your app's logic
  username?: string; // Username is optional
}
