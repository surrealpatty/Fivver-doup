// Define the UserPayload interface for user-related data passed with the request (e.g., JWT)
export interface UserPayload {
  id: string;       // The user's ID (required)
  email: string;    // The user's email (required)
  username: string; // The user's username (required)
  tier?: string;    // Optional tier if applicable
}
