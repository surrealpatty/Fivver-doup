// Define the UserPayload interface
export interface UserPayload {
  id: string;
  email: string;
  username?: string;  // Optional username field
  tier?: string;      // Optional tier field, if needed
}
// Define the AuthRequest interface if necessary for custom request handling
export interface AuthRequest extends Request {
  user?: UserPayload;  // This extends the Express Request object to include 'user'
}
