import { Request } from 'express';

// Extend Express Request to include custom properties
export interface AuthRequest extends Request {
  user?: UserPayload;  // The authenticated user
  get(name: string): string | undefined;  // Explicitly define the 'get' method for headers
}

// User data structure for payload
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
}

// Types for Vue components if necessary (for routing purposes)
declare module 'vue' {
  export interface ComponentCustomProperties {
    $router: VueRouter; // If you need to access the router instance in components
  }
}
