import { Optional } from 'sequelize/types'; // Correct import path for Optional

export interface OrderAttributes {
  id: string;
  quantity: number; // Add quantity
  totalPrice: number; // Add totalPrice
  updatedAt: Date;
  userId: string;
  item: string;
  price: number;
  status?: string;
  createdAt?: string;
  serviceId: string;
  amount: number;
}

// Optional fields during creation (excluding `id`, `createdAt`, and `updatedAt` as they are auto-generated)
export interface OrderCreationAttributes
  extends Optional<OrderAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Optional fields for updating orders
export interface UpdateOrderRequest {
  status?: string; // Make status optional
  quantity?: number; // Make quantity optional
  totalPrice?: number; // Make totalPrice optional
}
