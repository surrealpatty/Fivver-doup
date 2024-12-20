// src/types/index.ts
export interface UserPayload {
    id: string;        // ID is required
    email?: string;    // Email is optional
    username?: string; // Username is optional
    tier: string;      // Tier is required (set to 'free' or 'paid')
  }
  
  export interface CustomAuthRequest extends Request {
    user?: UserPayload;  // Attach the UserPayload to the Request object
  }
  