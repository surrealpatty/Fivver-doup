// src/types/index.ts
export interface UserPayload {
    id: string;         // `id` should always be a string
    email: string;      // Ensure `email` is required
    username?: string;  // `username` is still optional
}
