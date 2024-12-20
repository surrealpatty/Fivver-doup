// src/types/Order.ts

// Importing Optional from Sequelize for partial model attributes
import { Optional } from 'sequelize/types'; 

// Define the OrderAttributes interface to represent the full attributes of an order
export interface OrderAttributes {
  id: string;
  quantity: number;     // Quantity of the item
  totalPrice: number;   // Total price of the order
  updatedAt: Date;      // Timestamp of last update
  userId: string;       // ID of the user placing the order
  item: string;         // Item being ordered
  price: number;        // Price of the item
  status?: string;      // Optional order status (e.g., 'pending', 'completed')
  createdAt?: string;   // Optional timestamp of creation
  serviceId: string;    // Service ID related to the order
  amount: number;       // Amount of the order
}

// Optional fields during creation (excluding `id`, `createdAt`, and `updatedAt` as they are auto-generated)
export interface OrderCreationAttributes
  extends Optional<OrderAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Optional fields for updating orders
export interface UpdateOrderRequest {
  status?: string;      // Make status optional for updates
  quantity?: number;    // Make quantity optional for updates
  totalPrice?: number;  // Make totalPrice optional for updates
}

// Define the OrderPayload interface, which will be used for API requests and responses
export interface OrderPayload {
  id: string;
  serviceId: string;
  userId: string;
  amount: number;
  status: string;
}

// Define the Order interface, which represents a full order object (used after fetching from the database)
export type Order = {
  id: string;
  serviceId: string;
  userId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
