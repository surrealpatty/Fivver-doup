import { Request } from 'express';
/**
 * IUserAttributes interface represents the attributes of a user model instance
 * (used after the user is created in the database).
 */
export interface UpdateOrderRequest {
    status?: string;
    quantity?: number;
    totalPrice?: number;
  }
  
/**
 * IUserCreationAttributes interface is used for creating new user instances.
 * This interface excludes the `id` field, as it is auto-generated.
 */
export interface IUserCreationAttributes extends Omit<IUserAttributes, 'id'> {
}
/**
 * UserPayload interface represents the payload data embedded in a JWT token.
 * It contains essential user information for authentication.
 */
export interface UserPayload {
    id: string;
    email: string;
    username: string;
}
/**
 * AuthRequest interface extends the Express Request type to include a `user` property.
 * This property represents the authenticated user's data extracted from the JWT.
 */
export interface AuthRequest extends Request {
    user?: UserPayload;
}
