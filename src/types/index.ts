// src/types/index.ts

// Define UserPayload interface
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier?: string;  // Add 'tier' to UserPayload if it's required for your logic
}

// Define the AuthRequest interface extending Request to include a user property
export interface AuthRequest extends Request {
  user: UserPayload;  // Ensure `user` is always present
}

// Type guard function to check if req.user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string' && typeof user.tier === 'string';  // Check that 'id' and 'tier' exist
}
