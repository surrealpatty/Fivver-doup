import { UserPayload } from './UserPayload';  // Import your UserPayload interface

// Type guard to ensure req.user is of type UserPayload
export function isUser(user: any): user is UserPayload {
  return typeof user === 'object' && user !== null && typeof user.id === 'string' && typeof user.email === 'string';
}
