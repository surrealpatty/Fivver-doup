export interface UserPayload {
  id: string;
  email: string;
  username: string;
  tier: string;  // Ensure 'tier' is defined as a required field here
}

export interface AuthRequest extends Request {
  user?: UserPayload;  // UserPayload includes 'tier' and other fields
}
