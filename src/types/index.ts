import { Request } from 'express';
import { useRouter } from 'vue-router';  // Correct import for Vue Router in Vue 3

// Extend Express Request to include custom properties
export interface AuthRequest extends Request {
  user: UserPayload;  // Ensure 'user' is always defined, or handle undefined case in middleware
  get(name: string): string | undefined;  // Correct 'get' method signature to return string | undefined (align with Express)
}

// User data structure for payload
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
}

// Types for Vue components if necessary (for routing purposes)
declare module 'vue' {
  // Ensure Vue 3 correctly types the $router property
  interface ComponentCustomProperties {
    $router: ReturnType<typeof useRouter>;  // Correctly type the $router property in Vue components
  }
}
