// src/types/order.ts
import { Optional } from 'sequelize'; // Import Optional from Sequelize

// Represents the attributes of an order (with non-optional fields)
export interface OrderAttributes {
  id: string;
  serviceId: string;
  status: string; // Status of the order
  quantity: number; // Quantity of the service ordered
  totalPrice: number; // Total price for the order
  createdAt: Date; // Timestamp of when the order was created
  updatedAt: Date; // Timestamp of when the order was last updated
}

// Represents the attributes of an order during creation, excluding auto-generated fields
export interface OrderCreationAttributes
  extends Optional<OrderAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Represents the fields that can be updated in an existing order (all fields are optional)
export interface UpdateOrderRequest {
  status?: string; // Optional status update
  quantity?: number; // Optional quantity update
  totalPrice?: number; // Optional total price update
}
