// src/types/index.ts

// Ensure that the UserPayload interface has a non-optional email property
export interface UserPayload {
  id: string;
  email: string;  // Make sure email is always a string
  username?: string;
}

// Define the AuthRequest interface extending Express' Request
// user is optional because not every request may have a user attached
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user field (user may not exist on every request)
}

// CustomAuthRequest extends AuthRequest with a required user field
// user is always guaranteed to be a UserPayload here
export interface CustomAuthRequest extends AuthRequest {
  user: UserPayload;  // Make sure user is always a UserPayload
}

// Type guard to check if the user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Ensure 'user.id' is a string
}
