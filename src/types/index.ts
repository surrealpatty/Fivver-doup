export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier?: string; // Add 'tier' property
}

// Export UserPayload explicitly if needed
export { UserPayload };
