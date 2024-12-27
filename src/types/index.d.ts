// src/types/index.d.ts

// Define IUserAttributes if it doesn't exist
export interface IUserAttributes {
  id: string;
  email: string;
  username: string;
  password?: string; // optional field, add other fields as per your model
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateOrderRequest {
  status?: string;
  quantity?: number;
  totalPrice?: number;
}

export interface IUserCreationAttributes extends Omit<IUserAttributes, 'id'> {}

export interface UserPayload {
  id: string;
  email: string;
  username: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}
