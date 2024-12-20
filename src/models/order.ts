// src/models/order.ts
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

// Define the Order model, which represents the 'orders' table
@Table({ tableName: 'orders', timestamps: false }) // Set timestamps to false if you're not using createdAt and updatedAt
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)

  @Column(DataType.INTEGER)
  userId!: number;  // Foreign key to the user who made the order

  @Column(DataType.INTEGER)
  serviceId!: number;  // Foreign key to the service ordered

  @Column(DataType.STRING)
  orderDetails!: string;  // Details of the order

  @Column(DataType.STRING)
  status!: string;  // Status of the order (e.g., pending, completed)

  @Column(DataType.STRING)
  item!: string; // Add 'item' to the order model

  @Column(DataType.INTEGER)
  quantity!: number; // Add 'quantity' to the order model
}

export default Order;
