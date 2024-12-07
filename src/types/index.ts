// Define the UserPayload interface
export interface UserPayload {
  id: string;
  email: string;
  username: string;  // Make sure 'username' is required if it's expected
  tier?: string;     // Optional tier property
}

// Define the AuthRequest interface if it's necessary
export interface AuthRequest extends Request {
  user?: UserPayload;  // This will extend Request to include 'user'
}
