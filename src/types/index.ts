export type UserTier = 'free' | 'paid';
export type UserRole = 'user' | 'admin' | 'moderator';

export interface UserPayload {
    id: string;
    email?: string;
    username?: string;
    role?: UserRole;
    tier?: UserTier;
    isVerified?: boolean;
}

export interface AuthRequest extends Request {
    user?: UserPayload;
}

export interface CustomAuthRequest extends Request {
    user: UserPayload;
}
