export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  role?: string;  // Add the role property if it's part of the user data
  tier?: string;  // Optional if you're also using the tier property
}
