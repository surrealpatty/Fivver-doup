// src/types/index.ts

export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  role?: string;  // Add the role field here if it's part of UserPayload
}
