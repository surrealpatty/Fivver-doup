// src/types/order.ts
import { Optional } from 'sequelize'; // Import Optional from Sequelize

export interface OrderAttributes {
  id: string;
  serviceId: string;
  status: string; // Add status
  quantity: number; // Add quantity
  totalPrice: number; // Add totalPrice
  createdAt: Date;
  updatedAt: Date;
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
