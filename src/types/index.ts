// src/types/index.ts

export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
}

// Ensure that the 'user' property is consistently typed
export interface SomeInterface {
  user?: UserPayload;  // Ensure that this matches the UserPayload definition
  // Add other properties here if needed
}
