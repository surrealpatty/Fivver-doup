export interface UserPayload {
    id: string;
    email: string; // Ensure this is required, or modify it to optional if needed
    username?: string;
}
