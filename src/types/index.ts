export interface UserPayload {
  id: string;
  email: string;
  username?: string;
  tier?: string; // Optional, add tier if it's part of your logic
}
