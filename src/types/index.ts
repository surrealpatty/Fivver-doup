export interface UserPayload {
  id: string;
  email: string;  // Ensure email is always a string
  username?: string;
}

export interface CustomAuthRequest extends Request {
  user?: UserPayload; // Make user optional if it's not always present
}
