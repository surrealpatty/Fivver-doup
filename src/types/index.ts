export interface UserPayload {
  id: string;
  email: string;
  username: string;
  tier?: string;
}

// Define AuthRequest if it's expected or remove references to it
export interface AuthRequest {
  user: UserPayload;
  // You can include other properties as necessary, like `token`
}
